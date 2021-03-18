import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WordSignService } from 'src/app/_services/word-sign.service';
import { Word } from '../../_models/word';
import { WordService } from '../../_services/word.service';

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
  private locale: string[] | any; // Locale is expected to have three values: [0]spokenLang [1]signLang [2]country
  public localeInt: number | any; // 0: de, 1: es, 2: en, 3: fr, 4: it, 5: pt
  public ready: boolean = false;
  public error: string = '';
  //TODO: Get vidPosition from carousel
  public vidPosition: number = 0;
  vid: any; 

  public strDef: string[] = ["Definition", "Definición", "Definition", "Définition", "Definizione", "Definição"];
  public strExp: string[] = ["Erläuterung", "Explicación", "Explanation", "Explication","Spiegazione", "Explicação"];
  public strDet: string[] = ["Einzelheiten", "Detalles", "Details", "Détails", "Dettagli", "Detalhes"];
  public strFot: string[] = ["Ähnliche fotos", "Fotografías relacionadas", "Related photos", "Photos connexes", "Foto correlate", "Fotos relacionadas"];
  public strCat: string[] = ["Kategorie", "Categoría", "Category", "Catégorie", "Categoria", "Categoria"];
  public strLen: string[] = ["Zeichensprache", "Lengua de señas", "Sign Language", "Langage des signes", "Linguaggio dei segni", "Linguagem de sinais"];
  public strReg: string[] = ["Region", "Región", "Region", "Région", "Regione", "Região"];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wordService: WordService,
    private wordSignService: WordSignService,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.getLocale()
    this.getIdTxt()
    this.getWord();
    this.createVideoURLs()
    this.vid = document.getElementsByName("sign-video");

    //TODO: Add a way to trigger the video loading after everything has been loaded.
    //TODO: Create event listener for videos or carousel to load only the video on focus on the carousel.
    //TODO: What if txt doesn't match current locale txt?
  }

  //Gets locale through params, or infers it using navigator or IP address.
  // TODO: infer sign language.
  private getLocale(): void {
    var country: string | any;
    var loc = this.route.snapshot.queryParamMap.get('loc')
    if (loc == null) {
      if (navigator.language.includes('-')) { // navigator.language == 'es-MX'
        var locale: string[] = navigator.language.split('-')
        this.locale = [locale[0], '', locale[1]]
      } else {
        this.http.get("https://api.ipgeolocationapi.com/geolocate/").pipe(map((json: any): 
        Object => {
          return (json['alpha2'] as string)
        })).subscribe(
          response => {
            country = response;
          }, 
          err => console.error(err));
        this.locale = [navigator.language, '', country]
      }
    } else {
      this.locale = loc.split('_')
    }
    this.localeInt = this.getLocaleInt(this.locale[0])
  }

  //Sets the LocaleInt globally depending on a given alpha2 country code.
  public getLocaleInt(str: string): number {
    switch (str) {
      case 'de':
        return 0;
      case 'es':
        return 1;
      case 'en':
        return 2;
      case 'fr':
        return 3;
      case 'it':
        return 4;
      case 'pt':
        return 5;
      default:
        return 2;
    }
  }

  //Gets the id and txt parameters from the URL and instanciates it globally.
  // I.E. route: https://handsapp.org/word?loc=es_LSM_MX&id=1&txt=Abeja
  //TODO: manage incorrect id's
  private getIdTxt(): void {
    this.wordTXT = this.route.snapshot.queryParamMap.get('txt');
    this.wordID =  this.route.snapshot.queryParamMap.get('id');

    if (this.wordID == null || this.wordID == '' && this.wordTXT == null || this.wordTXT == '' ) {
      this.navigate("/404", this.locale, this.wordID, this.wordTXT);
    } else if (this.wordTXT != null && this.wordID == null) {
      this.navigate("/search", this.locale, this.wordID, this.wordTXT);
    }
  }

  //Gets a word from the API and instanciates it globally.
  private getWord(): void {
    this.wordService.getWord(+this.wordID).subscribe(
      response => {
        this.word = new Word(response);
      }, 
      err => this.navigate("/404", this.locale, this.wordID, this.wordTXT));
    
  }

  //Gets all the wordSigns of a word and instanciates the array of video URLs globally.
  //TODO: Create count versions route in API.
  private createVideoURLs(): void {
    const version: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const URL: string = "https://storage.googleapis.com/video.handsapp.org/" + this.locale[1] + "/words/";
    this.wordSignService.getWordSigns(+this.wordID).subscribe(
      response => {
        this.videos = new Array(response.length);
        for (let i = 0; i < response.length; i++) {
          this.videos[i] = URL + this.wordID + '-' + version[i] + '.mp4';
        }
        this.ready = true;    
      }, 
      err => console.error(err));
  }

  //Sets the playback speed of a video.
  public setPlaybackSpeed(speed: number, vidPos: number){
    switch (speed) {
      case 0:
        if (this.vid[vidPos].playbackRate) {
          this.vid[vidPos].playbackRate = 0;
        } else if (this.vid[vidPos].webkitPlaybackRate) {
          this.vid[vidPos].webkitPlaybackRate = 0;
        } else if (this.vid[vidPos].msPlaybackRate) {
          this.vid[vidPos].msPlaybackRate = 0;
        }
        break;

      case 0.5:
        if (this.vid[vidPos].playbackRate) {
          this.vid[vidPos].playbackRate = 0.5;
        } else if (this.vid[vidPos].webkitPlaybackRate) {
          this.vid[vidPos].webkitPlaybackRate = 0.5;
        } else if (this.vid[vidPos].msPlaybackRate) {
          this.vid[vidPos].msPlaybackRate = 0.5;
        }
        break;
    
      case 1.5:
        if (this.vid[vidPos].playbackRate) {
          this.vid[vidPos].playbackRate = 1.5;
        } else if (this.vid[vidPos].webkitPlaybackRate) {
          this.vid[vidPos].webkitPlaybackRate = 1.5;
        } else if (this.vid[vidPos].msPlaybackRate) {
          this.vid[vidPos].msPlaybackRate = 1.5;
        }
        break;

      default:
        if (this.vid[vidPos].playbackRate) {
          this.vid[vidPos].playbackRate = 1;
        } else if (this.vid[vidPos].webkitPlaybackRate) {
          this.vid[vidPos].webkitPlaybackRate = 1;
        } else if (this.vid[vidPos].msPlaybackRate) {
          this.vid[vidPos].msPlaybackRate = 1;
        }
        break;
    }
  }

  //Opens a video fullscreen.
  //TODO: Fix method to work with videos array.
  public openFullscreen(vidPos: number) {
    if (this.vid[vidPos].requestFullscreen) {
      this.vid[vidPos].requestFullscreen();
    } else if (this.vid[vidPos].webkitRequestFullscreen) {
      this.vid[vidPos].webkitRequestFullscreen();
    } else if (this.vid[vidPos].msRequestFullscreen) {
      this.vid[vidPos].msRequestFullscreen();
    }
  }
  
  // navigate redirects faster through router with id & txt parameters.
  public navigate(page: String, locP: string[], idP: String, txtP: String): void {
    this.router.navigate([page], {queryParams: {loc: locP[0] + "_" + locP[1] + "_" + locP[2], id: idP, txt: txtP}});
  }

  get wordId() { return (this.word && this.word.wordID) ? this.word.wordID : null }

}



