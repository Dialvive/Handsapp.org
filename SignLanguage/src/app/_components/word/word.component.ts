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

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.css']
})

export class WordComponent implements OnInit {

  public word: Observable<Word> | any;
  public videos: String[] | any;
   
  public wordID: string | any;
  public wordTXT: string | any;
  public ready: boolean = false;
  public error: string = '';
  public categories: WordCategory[] | any;
  public vidIndex: number = 0;

  vid: any | HTMLVideoElement 
  @ViewChild("icon") icon: any;

  public strDef: string[] = ["Definition", "Definición", "Definition", "Définition", "Definizione", "Definição"];
  public strExp: string[] = ["Erläuterung", "Explicación", "Explanation", "Explication","Spiegazione", "Explicação"];
  public strDet: string[] = ["Einzelheiten", "Detalles", "Details", "Détails", "Dettagli", "Detalhes"];
  public strFot: string[] = ["Ähnliche fotos", "Fotografías relacionadas", "Related photos", "Photos connexes", "Foto correlate", "Fotos relacionadas"];
  public strCat: string[] = ["Kategorie", "Categoría", "Category", "Catégorie", "Categoria", "Categoria"];
  public strLen: string[] = ["Zeichensprache", "Lengua de señas", "Sign Language", "Langage des signes", "Linguaggio dei segni", "Linguagem de sinais"];
  public strReg: string[] = ["Region", "Región", "Region", "Région", "Regione", "Região"];
  public nfRes: String[] = ["Übersetzung nicht verfügbar", "Traducción no disponible" ,"Translation not available","Traduction non disponible","Traduzione non disponibile","Tradução não disponível"]

  constructor(
    private wordService: WordService,
    private wordSignService: WordSignService,
    public route: ActivatedRoute,
    public appComponent: AppComponent,
    public wordCategoryService : WordCategoryService,
  ) { }

  ngOnInit(): void {
    this.getIdTxt();
    this.getWord();
    this.createVideoURLs();
    this.getWordCategories();
    //while(this.vid == null) {
    
    //}
    //this.vid = document.getElementById("sign-video");
    //this.setPlay()
  
    //TODO: Add a way to trigger the video loading after everything has been loaded.
    //TODO: Create event listener for videos or carousel to load only the video on focus on the carousel.
    //TODO: What if txt doesn't match current locale txt?
  }

  //Gets the id and txt parameters from the URL and instanciates it globally.
  // I.E. route: https://handsapp.org/word?loc=es_LSM_MX&id=1&txt=Abeja
  //TODO: manage incorrect id's
  private getIdTxt(): void {
    this.wordTXT = this.route.snapshot.queryParamMap.get('txt');
    this.wordID =  this.route.snapshot.queryParamMap.get('id');
    if (this.wordID == null || this.wordID == '' && this.wordTXT == null || this.wordTXT == '' ) {
      this.appComponent.navigateParams("/404", this.appComponent.locale, this.wordID, this.wordTXT);
    } else if (this.wordTXT != null && this.wordID == null) {
      this.appComponent.navigateParams("/search", this.appComponent.locale, this.wordID, this.wordTXT);
    }
  }

  //Gets a word from the API and instanciates it globally.
  private getWord(): void {
    this.wordService.getWord(+this.wordID).subscribe(
      response => {
        this.word = new Word(response);
      }, 
      err => this.appComponent.navigateParams("/404", this.appComponent.locale, this.wordID, this.wordTXT));
  }

  //Gets all the wordSigns of a word and instanciates the array of video URLs globally.
  //TODO: Create count versions route in API. Fix SignLang in URL 
  private createVideoURLs(): void {
    const version: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const URL: string = "https://storage.googleapis.com/video.handsapp.org/" + "LSM" + "/words/";
    this.wordSignService.getWordSigns(+this.wordID).subscribe(
      response => {
        this.videos = new Array(response.length);
        
        for (let i = 0; i < response.length; i++) {
          this.videos[i] = URL + this.wordID + '-' + version[i] + '.mp4';
          
        }
        
        this.ready = true;  
        console.log(this.appComponent.locale[1]);  
      }, 
      err => console.error(err));
  }

  //Gets every word category and instanciates them globally in a 2 dimensional array
  private getWordCategories(): void {
    this.wordCategoryService.getWordCategories().subscribe(
      response => {
        this.categories = response;
      }, 
      err => console.log(err));
      console.log(this.categories)
  }

  public findCategoryByID(lang:number) : string{
    var id = this.word.word_category_ID;
    var catAux : WordCategory = this.categories.find((i : WordCategory) => i.ID == id); 
    var aux = this.getCategoryByIdiom(catAux,lang);
    return aux;
  }

  public getCategoryByIdiom(cat:WordCategory, id:number) {
    var auxCat = new WordCategory(cat);
    return auxCat.getNameByIdiom(id);
  }

  //Opens a video fullscreen.
  //TODO: Fix method to work with videos array.
  public openFullscreen() {
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
    if(this.vid.paused) {
      this.icon.nativeElement.className = "bi bi-pause-fill";
      this.vid.play();
    } else {
      this.icon.nativeElement.className = "bi bi-play-fill";
      this.vid.pause();
    }
  }


  setRabbit(){
    this.vid = document.getElementById('sign-video');
    if (this.vid.playbackRate) {
      this.vid.playbackRate = 1;
    } else if (this.vid.webkitPlaybackRate) {
      this.vid.webkitPlaybackRate = 1;
    } else if (this.vid.msPlaybackRate) {
      this.vid.msPlaybackRate = 1;
    }
  }

  setTurtle(){
    this.vid = document.getElementById('sign-video');
    if (this.vid.playbackRate) {
      this.vid.playbackRate = 0.5;
    } else if (this.vid.webkitPlaybackRate) {
      this.vid.webkitPlaybackRate = 0.5;
    } else if (this.vid.msPlaybackRate) {
      this.vid.msPlaybackRate = 0.5;
    }
  }

  setFox(){
    this.vid = document.getElementById('sign-video');
    if (this.vid.playbackRate) {
      this.vid.playbackRate = 1.5;
    } else if (this.vid.webkitPlaybackRate) {
      this.vid.webkitPlaybackRate = 1.5;
    } else if (this.vid.msPlaybackRate) {
      this.vid.msPlaybackRate = 1.5;
    }
  }


  videoUrl(url : string, vidPos: number){
    this.vid = document.getElementById('sign-video');
    this.vid.src = url;
    this.vidIndex = vidPos;
    //video.play();
    console.log(url);
  }

  nextVideo(){
    //console.log("video index = " + this.vidIndex + ", videos.length = " + this.videos.length);
    if (this.vidIndex != this.videos.length-1) {
      this.vid = document.getElementById('sign-video');
      this.vid.src = this.videos[++this.vidIndex ];
      console.log(this.vidIndex);
    }
  }

  previousVideo(){
    if (this.vidIndex != 0) {
      this.vid = document.getElementById('sign-video');
      this.vid.src = this.videos[--this.vidIndex ];
      console.log(this.vidIndex);
    }
  }
  
}




