import { AfterViewInit, Component } from '@angular/core';
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
import { LinkService } from 'src/app/_services/link/link.service';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.css'],
})

export class WordComponent implements AfterViewInit {

  public word: Observable<Word> | any;
  public videos: string[] = [""];
  public wordID: string = '';
  public wordTXT: string = '';
  public ready: boolean = false;
  public error: string = '';
  public categories: WordCategory[] = [];
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
  public strHash: string[] = ["Zeichensprache", "LenguaDeSeñas", "SignLanguage", "LangageDesSignes", "LinguaggioDeiSegni", "LinguagemDeSinais"];
  public strReg: string[] = ["Region", "Región", "Region", "Région", "Regione", "Região"];
  public nfRes: String[] = ["Definition nicht verfügbar", "Definición no disponible", "Definition not available", "Définition non disponible", "Definizione non disponibile", "Definição não disponível"]
  public strTit: string[] = ["Wort in ", "Palabra en ", "Word in ", "Mot en ", "Parola in ", "Palavra em "];
  public strComSoon: string[] = ["kommt bald", "Próximamente", "Coming soon", "Bientôt disponible", "Prossimamente", "Em breve"];
  public strShare: string[] = ["Teilen", "Compartir", "Share", "Partager", "Condividere", "Compartilhar"];
  public strShareTxt: string[] = [
    "Dieses Wort in Gebärdensprache wird Sie sicher interessieren! Schaut es euch unter diesem Link an: ",
    "¡Estoy seguro que te va a interesar ésta palabra en lengua de señas! Mirala en este enlace: ",
    "I'm sure you are going to be interested in this word in sign language! Check it out at this link: ",
    "Je suis sûr que vous allez être intéressé par ce mot en langue des signes! A découvrir sur ce lien: ",
    "Sono sicuro che sarai interessato a questa parola nella lingua dei segni! Dai un'occhiata a questo link: ",
    "Tenho certeza de que você vai se interessar por essa palavra em linguagem de sinais! Confira neste link: "];

  constructor(
    private wordService: WordService,
    private wordSignService: WordSignService,
    public route: ActivatedRoute,
    public appComponent: AppComponent,
    public wordCategoryService: WordCategoryService,
    public googleAnalyticsService: GoogleAnalyticsService,
    private linkService: LinkService,
    private meta: Meta
  ) { }

  //A lifecycle hook that is called after Angular has fully initialized a component's view.
  ngAfterViewInit() {
    this.createVideoURLs();
    this.linkService.updateCanonicalUrl("http://HandsApp.org/word?id=" + this.wordID);
    this.ready = true;
  }

  //Gets the id and txt parameters from the URL and instanciates it globally.
  // I.E. route: https://handsapp.org/word?loc=es_LSM_MX&id=1&txt=Abeja
  private getIdTxt(): void {
    this.wordTXT = this.route.snapshot.queryParamMap.get('txt') || 'ERR';
    this.wordID = this.route.snapshot.queryParamMap.get('id') || 'ERR';
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

  //Assigns a url for the video HTML component to load
  private setVideoSrc() {
    const vidSrc: HTMLVideoElement | any = document.getElementById('sign-video');
    vidSrc.src = this.videos[0];
    this.setMeta();
  }

  /* VIDEO CONTROL BUTTONS ##################################################################### */

  //Opens a video fullscreen.
  public openFullscreen() {
    this.googleAnalyticsService.eventEmitter(
      "fullscreen",
      "Video",
      "Fullscreen",
      "Word: " + window.innerWidth + "x" + window.innerHeight,
      parseInt(this.wordID));

    this.vid = document.getElementById('sign-video');
    if (this.vid.requestFullscreen) {
      this.vid.requestFullscreen();
    } else if (this.vid.webkitRequestFullscreen) {
      this.vid.webkitRequestFullscreen();
    } else if (this.vid.msRequestFullscreen) {
      this.vid.msRequestFullscreen();
    }
  }

  //Plays and pauses the video
  public setPlay() {
    this.vid = document.getElementById('sign-video');
    //this.vid.playbackRate = 1;
    if (this.vid.paused) {
      this.googleAnalyticsService.eventEmitter(
        "play", "Video", "Play", "Word", parseInt(this.wordID));
      this.icon.nativeElement.className = "video-bi bi bi-pause-fill";
      this.vid.play();
    } else {
      this.googleAnalyticsService.eventEmitter(
        "pause", "Video", "Pause", "Word", parseInt(this.wordID));
      this.icon.nativeElement.className = "video-bi bi bi-play-fill";
      this.vid.pause();
    }
  }

  //Sets the video speed to normal x1
  public setRabbit() {
    this.vid = document.getElementById('sign-video');
    this.googleAnalyticsService.eventEmitter(
      "normalSpeed", "Video", "Normal Speed", "Word", parseInt(this.wordID));
    if (this.vid.playbackRate) {
      this.vid.playbackRate = 1;
    } else if (this.vid.webkitPlaybackRate) {
      this.vid.webkitPlaybackRate = 1;
    } else if (this.vid.msPlaybackRate) {
      this.vid.msPlaybackRate = 1;
    }
  }

  //Sets the video in lower speed x0.5
  public setTurtle() {
    this.vid = document.getElementById('sign-video');
    this.googleAnalyticsService.eventEmitter(
      "slowerSpeed", "Video", "Slower Speed", "Word", parseInt(this.wordID));
    if (this.vid.playbackRate) {
      this.vid.playbackRate = 0.5;
    } else if (this.vid.webkitPlaybackRate) {
      this.vid.webkitPlaybackRate = 0.5;
    } else if (this.vid.msPlaybackRate) {
      this.vid.msPlaybackRate = 0.5;
    }
  }

  //Sets the video in faster speed x1.5
  public setFox() {
    this.googleAnalyticsService.eventEmitter(
      "fasterSpeed", "Video", "Faster Speed", "Word", parseInt(this.wordID));
    this.vid = document.getElementById('sign-video');
    if (this.vid.playbackRate) {
      this.vid.playbackRate = 1.5;
    } else if (this.vid.webkitPlaybackRate) {
      this.vid.webkitPlaybackRate = 1.5;
    } else if (this.vid.msPlaybackRate) {
      this.vid.msPlaybackRate = 1.5;
    }
  }

  //If there is more than one video, moves to the next
  public nextVideo() {
    if (this.vidIndex != this.videos.length - 1) {
      this.vid = document.getElementById('sign-video');
      this.vid.src = this.videos[++this.vidIndex];
      this.googleAnalyticsService.eventEmitter(
        "nextVideo", "Video", "Next Video", "Word", parseInt(this.wordID));
    }
  }

  //If there is more than one video, moves to the previous
  public previousVideo() {
    if (this.vidIndex != 0) {
      this.vid = document.getElementById('sign-video');
      this.vid.src = this.videos[--this.vidIndex];
      this.googleAnalyticsService.eventEmitter(
        "previousVideo", "Video", "Previous Video", "Word", parseInt(this.wordID));
    }
  }

  //Assigns a url for the video HTML component when the user clicks on next or previous video.
  public videoUrl(url: string, vidPos: number) {
    this.vid = document.getElementById('sign-video');
    this.vid.src = url;
    this.vidIndex = vidPos;
    //video.play();
    console.log(url);
  }

  /* METADATA & JSON-LD SCHEMA ################################################################# */

  //Sets a JSON-LD schema for SEO purposes
  public setSchema(): Object {
    return {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      'name': this.word.getText()[this.appComponent.localeInt] + ' - ' +
        this.strTit[this.appComponent.localeInt] + this.appComponent.locale[1],
      'description':
        this.word.getText()[this.appComponent.localeInt] + ': ' +
        this.word.getDefinitions()[this.appComponent.localeInt],
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

  //setMeta assigns meta tags according to the localeInt
  private setMeta(): void {
    if (this.meta.getTag("name='og:video'") != null) {
      this.meta.updateTag({ property: 'og:video', content: this.videos[0] }, "property='og:video'");
    } else {
      this.meta.addTag({ property: 'og:video', content: this.videos[0] });
    }
    if (this.meta.getTag("name='og:video:secure_url'") != null) {
      this.meta.updateTag(
        { property: 'og:video:secure_url', content: this.videos[0] }, "property='og:video:secure_url'");
    } else {
      this.meta.addTag({ property: 'og:video:secure_url', content: this.videos[0] });
    }
    this.meta.addTag({ property: 'og:video:type', content: "video/mp4" });
    this.meta.addTag({ property: 'og:video:width', content: "1920" });
    this.meta.addTag({ property: 'og:video:height', content: "1080" });
    this.meta.addTag({ property: 'og:type', content: "video.other" });
    this.meta.addTag({ property: 'og:video:tag', content: "HandsApp" });
    this.meta.addTag({ property: 'og:video:tag', content: "zeichensprache" });
    this.meta.addTag({ property: 'og:video:tag', content: "lengua de señas" });
    this.meta.addTag({ property: 'og:video:tag', content: "Sign Language" });
    this.meta.addTag({ property: 'og:video:tag', content: "langage des signes" });
    this.meta.addTag({ property: 'og:video:tag', content: "linguaggio dei segni" });
    this.meta.addTag({ property: 'og:video:tag', content: "linguagem de sinais" });
    this.meta.addTag({ property: 'og:video:tag', content: "learn" });
    this.meta.addTag({ property: 'og:video:tag', content: "imparare" });
    this.meta.addTag({ property: 'og:video:tag', content: "lernen" });
    this.meta.addTag({ property: 'og:video:tag', content: "apprendre" });
    this.meta.addTag({ property: 'og:video:tag', content: this.appComponent.locale[1] });
    this.meta.addTag({ property: 'og:video:tag', content: this.word.text_de });
    this.meta.addTag({ property: 'og:video:tag', content: this.word.text_es });
    this.meta.addTag({ property: 'og:video:tag', content: this.word.text_en });
    this.meta.addTag({ property: 'og:video:tag', content: this.word.text_fr });
    this.meta.addTag({ property: 'og:video:tag', content: this.word.text_it });
    this.meta.addTag({ property: 'og:video:tag', content: this.word.text_pt });
    this.meta.addTag({
      property: 'og:title', content:
        this.word.getText()[this.appComponent.localeInt] + ' - ' +
        this.strTit[this.appComponent.localeInt] +
        this.appComponent.locale[1]
    });
  }

  /* GOOGLE ANALYTICS EMMITTERS ################################################################ */

  // Click on like button
  public eventLikeWord(): void {
    this.googleAnalyticsService.eventEmitter(
      "likeWord", "Like", "Like Word", "Word", parseInt(this.wordID));
  }

  // Click on like button
  public eventSaveWord(): void {
    this.googleAnalyticsService.eventEmitter(
      "saveWord", "Save", "Save Word", "Word", parseInt(this.wordID));
  }

  // Click on share with WhatsApp
  public eventShareWhatsApp(): void {
    this.googleAnalyticsService.eventEmitter(
      "shareWA", "Share", "Share with Whatsapp", "Word", parseInt(this.wordID));
  }

  // Click on share with Facebook
  public eventShareFacebook(): void {
    this.googleAnalyticsService.eventEmitter(
      "shareFB", "Share", "Share with Facebook", "Word", parseInt(this.wordID));
  }

  // Click on share with Twitter
  public eventShareTwitter(): void {
    this.googleAnalyticsService.eventEmitter(
      "shareTW", "Share", "Share with Twitter", "Word", parseInt(this.wordID));
  }

  // Click on share with Linkedin
  public eventShareLinkedIn(): void {
    this.googleAnalyticsService.eventEmitter(
      "shareLI", "Share", "Share with LinkedIn", "Word", parseInt(this.wordID));
  }

  // Click on share with email
  public eventShareEmail(): void {
    this.googleAnalyticsService.eventEmitter(
      "shareEM", "Share", "Share with Email", "Word", parseInt(this.wordID));
  }

  // Click on share with clipboard
  public eventShareClipboard(): void {
    this.googleAnalyticsService.eventEmitter(
      "shareCB", "Share", "Share with clipboard", "Word", parseInt(this.wordID));
  }
}
