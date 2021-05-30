import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { WordSignService } from 'src/app/_services/word-sign/word-sign.service';
import { Word } from '../../_models/word';
import { WordService } from '../../_services/word/word.service';
import { ViewChild } from '@angular/core';
import { AppComponent } from '../../app.component'
import { WordCategory } from 'src/app/_models/wordCategory';
import { WordCategoryService } from 'src/app/_services/word-category/word-category.service';
import { GoogleAnalyticsService } from '../../_services/GoogleAnalytics/google-analytics.service'

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.css'],
})

export class WordComponent implements OnInit {

  public word: Observable<Word> | any;
  public videos: string[] = [""];
  public wordID: string | any;
  public wordTXT: string | any;
  public ready: boolean = false;
  public error: string = '';
  public categories: WordCategory[] | any;
  public vidIndex: number = 0;
  public progress: number = 0;
  public category: WordCategory | any;

  vid: any | HTMLVideoElement
  @ViewChild("icon") icon: any;

  public strDef: string[] = ["Definition", "Definición", "Definition", "Définition", "Definizione", "Definição"];
  public strExp: string[] = ["Erläuterung", "Explicación", "Explanation", "Explication", "Spiegazione", "Explicação"];
  public strDet: string[] = ["Einzelheiten", "Detalles", "Details", "Détails", "Dettagli", "Detalhes"];
  public strFot: string[] = ["Ähnliche fotos", "Fotografías relacionadas", "Related photos", "Photos connexes", "Foto correlate", "Fotos relacionadas"];
  public strCat: string[] = ["Kategorie", "Categoría", "Category", "Catégorie", "Categoria", "Categoria"];
  public strLen: string[] = ["Zeichensprache", "Lengua de señas", "Sign Language", "Langage des signes", "Linguaggio dei segni", "Linguagem de sinais"];
  public strReg: string[] = ["Region", "Región", "Region", "Région", "Regione", "Região"];
  public nfRes: String[] = ["Definition nicht verfügbar", "Definición no disponible", "Definition not available", "Définition non disponible", "Definizione non disponibile", "Definição não disponível"]
  public strRep: String[] = [];
  public strTit: string[] = ["Wort in ", "Palabra en ", "Word in ", "Mot en ", "Parola in ", "Palavra em "];
  public strComSoon: string[] = ["kommt bald", "Próximamente", "Coming soon", "Bientôt disponible", "Prossimamente", "Em breve"];

  constructor(
    private wordService: WordService,
    private wordSignService: WordSignService,
    public route: ActivatedRoute,
    public appComponent: AppComponent,
    public wordCategoryService: WordCategoryService,
    private router: Router,
    public googleAnalyticsService: GoogleAnalyticsService,
  ) {

    //const nav = this.router.getCurrentNavigation();
    //this.videos = nav?.extras?.state?.value;
    //console.log("VIDEOS[0] = " + this.videos[0])

  }

  ngOnInit() {

    this.createVideoURLs();
   
    //while(this.vid == null) {

    //}
    //this.vid = document.getElementById("sign-video");
    //this.setPlay()

    //TODO: Add a way to trigger the video loading after everything has been loaded.
    //TODO: What if txt doesn't match current locale txt.
  }

  public setSchema(): Object {
    return {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      'name': this.word.getText()[this.appComponent.localeInt] + ' - ' +
        this.strTit[this.appComponent.localeInt] + this.appComponent.locale[1],
      'description': this.word.getText()[this.appComponent.localeInt] + ': ' + this.word.getDefinitions()[this.appComponent.localeInt],
      'thumbnailUrl': 'https://handsapp.org/assets/img/logo.png',
      'uploadDate': this.word.modified,
      'contentUrl': this.videos[0],
      'encodingFormat': 'video/mp4',
      'copyrightHolder': 'Tecnologías Haikode S.A.S. de C.V.',
      'copyrightNotice': 'All rights reserved.',
      'copyrightYear': 2021,
      'keywords': [
        this.word.text_de, this.word.text_es,
        this.word.text_en, this.word.text_fr,
        this.word.text_it, this.word.text_pt,
        this.category[0], this.category[1],
        this.category[2], this.category[3],
        this.category[4], this.category[5],
        'HandsApp', 'Hands App',
        this.strLen[0], this.strLen[1],
        this.strLen[2], this.strLen[3],
        this.strLen[4], this.strLen[5]],
      'isFamilyFriendly': true, //TODO: CHANGE IF EXPLICIT CONTENT
      'learningResourceType': 'video',
      'identifier': this.wordID,
      'url': 'https://handsapp.org' + this.appComponent.Location.path()
    }
  }

  //Gets the id and txt parameters from the URL and instanciates it globally.
  // I.E. route: https://handsapp.org/word?loc=es_LSM_MX&id=1&txt=Abeja
  //TODO: manage incorrect id's
  private getIdTxt(): void {
    this.wordTXT = this.route.snapshot.queryParamMap.get('txt');
    this.wordID = this.route.snapshot.queryParamMap.get('id');
    if (this.wordID == null || this.wordID == '' && this.wordTXT == null || this.wordTXT == '') {
      this.appComponent.navigateParams("/404", this.appComponent.locale, this.wordID, this.wordTXT);
    } else if (this.wordTXT != null && this.wordID == null) {
      this.appComponent.navigateParams("/search", this.appComponent.locale, this.wordID, this.wordTXT);
    }
  }

  //Gets a word from the API and instanciates it globally.
  private async getWord(): Promise<boolean> {
    this.wordService.getWord(+this.wordID).subscribe(
      response => {
        this.word = new Word(response);
        this.getWordCategory();
        return true;
      },
      err => {
        this.appComponent.navigateParams("/404", this.appComponent.locale, this.wordID, this.wordTXT)
        return false;
      });
    return false;
  }

  //Gets word category and instanciates them globally.
  private async getWordCategory() {
    this.wordCategoryService.getWordCategory(+this.word.word_category_ID).subscribe(
      response => {
        this.category = new WordCategory(response);
        return true;
      },
      err => {
        this.appComponent.navigateParams("/404", this.appComponent.locale, this.wordID, this.wordTXT)
        return false;
      });
  }

  //Gets all the wordSigns of a word and instanciates the array of video URLs globally.
  //TODO: Create count versions route in API. Fix SignLang in URL 
  private async createVideoURLs() {
    this.getIdTxt();
    await this.getWord()
    
    
    
    
    //await this.getWordCategories();
    //this.getWordCategories();
    const version: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const URL: string = "https://storage.googleapis.com/video.handsapp.org/" + "LSM" + "/words/";
    this.wordSignService.getWordSigns(+this.wordID).subscribe(
      response => {
        this.videos = new Array(response.length);
        for (let i = 0; i < response.length; i++) {
          this.videos[i] = URL + this.wordID + '-' + version[i] + '.mp4';
        }
        this.progress += 50;
        this.setVideoSrc();
      },
      err => console.error(err));
  }

  private setVideoSrc() {
    const vidSrc: HTMLVideoElement | any = document.getElementById('sign-video');
    vidSrc.src = this.videos[0];
  }

  //Opens a video fullscreen.
  //TODO: Fix method to work with videos array.
  public openFullscreen() {
    this.googleAnalyticsService.eventEmitter(
      "fullscreen",
      "video",
      "Fullscreen",
      window.innerWidth + "x" + window.innerHeight,
      window.innerWidth * window.innerHeight);
    this.vid = document.getElementById('sign-video');
    if (this.vid.requestFullscreen) {
      this.vid.requestFullscreen();
    } else if (this.vid.webkitRequestFullscreen) {
      this.vid.webkitRequestFullscreen();
    } else if (this.vid.msRequestFullscreen) {
      this.vid.msRequestFullscreen();
    }
  }

  get wordId() { return (this.word && this.word.wordID) ? this.word.wordID : null }
  
  setPlay() {
    this.vid = document.getElementById('sign-video');
    //this.vid.playbackRate = 1;
    if (this.vid.paused) {
      this.googleAnalyticsService.eventEmitter(
        "play",
        "video",
        "Play",
        "WordID:" + this.word.wordID,
        this.vid.currentTime);
      this.icon.nativeElement.className = "video-bi bi bi-pause-fill";
      this.vid.play();
    } else {
      this.googleAnalyticsService.eventEmitter(
        "pause",
        "video",
        "Pause",
        "WordID:" + this.word.wordID,
        this.vid.currentTime);
      this.icon.nativeElement.className = "video-bi bi bi-play-fill";
      this.vid.pause();
    }
  }

  setRabbit() {
    this.vid = document.getElementById('sign-video');
    this.googleAnalyticsService.eventEmitter(
      "normalSpeed",
      "video",
      "Normal Speed",
      "WordID:" + this.word.wordID,
      this.vid.currentTime);
    if (this.vid.playbackRate) {
      this.vid.playbackRate = 1;
    } else if (this.vid.webkitPlaybackRate) {
      this.vid.webkitPlaybackRate = 1;
    } else if (this.vid.msPlaybackRate) {
      this.vid.msPlaybackRate = 1;
    }
  }

  setTurtle() {
    this.vid = document.getElementById('sign-video');
    this.googleAnalyticsService.eventEmitter(
      "slowerSpeed",
      "video",
      "Slower Speed",
      "WordID:" + this.word.wordID,
      this.vid.currentTime);
    if (this.vid.playbackRate) {
      this.vid.playbackRate = 0.5;
    } else if (this.vid.webkitPlaybackRate) {
      this.vid.webkitPlaybackRate = 0.5;
    } else if (this.vid.msPlaybackRate) {
      this.vid.msPlaybackRate = 0.5;
    }
  }

  setFox() {
    this.googleAnalyticsService.eventEmitter(
      "fasterSpeed",
      "video",
      "Faster Speed",
      "WordID:" + this.word.wordID,
      this.vid.currentTime);
    this.vid = document.getElementById('sign-video');
    if (this.vid.playbackRate) {
      this.vid.playbackRate = 1.5;
    } else if (this.vid.webkitPlaybackRate) {
      this.vid.webkitPlaybackRate = 1.5;
    } else if (this.vid.msPlaybackRate) {
      this.vid.msPlaybackRate = 1.5;
    }
  }

  videoUrl(url: string, vidPos: number) {
    this.vid = document.getElementById('sign-video');
    this.vid.src = url;
    this.vidIndex = vidPos;
    //video.play();
    console.log(url);
  }

  nextVideo() {
    if (this.vidIndex != this.videos.length - 1) {
      this.vid = document.getElementById('sign-video');
      this.vid.src = this.videos[++this.vidIndex];
      this.googleAnalyticsService.eventEmitter("nextVideo", "video", "Next Video", "WordID:" + this.word.wordID, this.vid.currentTime);
    }
  }

  previousVideo() {
    if (this.vidIndex != 0) {
      this.vid = document.getElementById('sign-video');
      this.vid.src = this.videos[--this.vidIndex];
      this.googleAnalyticsService.eventEmitter("previousVideo", "video", "Previous Video", "WordID:" + this.word.wordID, this.vid.currentTime);
    }
  }
}




