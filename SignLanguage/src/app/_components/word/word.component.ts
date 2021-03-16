import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Word } from '../../_models/word';
import { WordService } from '../../_services/word.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Carousel } from 'bootstrap'
import Bootstrap from 'bootstrap/dist/js/bootstrap';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.css']
})
export class WordComponent implements OnInit {

  vid: any;
  carousel: Carousel | any;
  private locale: string[] | any;   // Locale is expected to have three values: [0]spokenLang [1]signLang [2]country
  public word: Observable<Word> | any;
  public wordID: string | any;
  public localeInt: number | any;
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
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.vid = document.getElementById("sign-video");
    this.carousel = document.getElementById('video-carousel')

    this.getLocale()

    const wordTxt: string | null = this.route.snapshot.queryParamMap.get('txt')
    this.wordID =  this.route.snapshot.queryParamMap.get('id')
    
    if (this.wordID == null && wordTxt == null) {
      this.navigate("/404")
    } else if (wordTxt != null && this.wordID == null) {
      this.navigate("/search")
    }

    // TODO: What if txt doesn't match with current locale txt?
   this.wordService.getWord(+this.wordID).subscribe(
    response => {
      this.word = new Word(response);
    }, 
    err => console.error(err))
  }

  //Gets locale through params, or infers it using navigator or IP address
  getLocale() {
    var country: string | any;
    var loc = this.route.snapshot.queryParamMap.get('loc')
    if (loc == null) {
      if (navigator.language.includes('-')) {
        var locale: string[] = navigator.language.split('-')
        this.locale = [locale[0], null, locale[1]]
      } else {
        this.http.get("https://api.ipgeolocationapi.com/geolocate/").pipe(map((json: any): 
        Object => {
          return (json['alpha2'] as string)
        })).subscribe(
          response => {
            country = response;
          }, 
          err => console.error(err))
          this.locale = [navigator.language, null, country]
      }
    } else {
      this.locale = loc.split('_')
    }
    this.localeInt = this.getLocaleInt(this.locale[0])
  }

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

  public setPlaybackSpeed(speed: number){
    switch (speed) {
      case 0.5:
        if (this.vid.playbackRate) {
          this.vid.playbackRate = 0.5;
        } else if (this.vid.webkitPlaybackRate) {
          this.vid.webkitPlaybackRate = 0.5;
        } else if (this.vid.msPlaybackRate) {
          this.vid.msPlaybackRate = 0.5;
        }
        break;
    
      case 1.5:
        if (this.vid.playbackRate) {
          this.vid.playbackRate = 1.5;
        } else if (this.vid.webkitPlaybackRate) {
          this.vid.webkitPlaybackRate = 1.5;
        } else if (this.vid.msPlaybackRate) {
          this.vid.msPlaybackRate = 1.5;
        }
        break;

      default:
        if (this.vid.playbackRate) {
          this.vid.playbackRate = 1;
        } else if (this.vid.webkitPlaybackRate) {
          this.vid.webkitPlaybackRate = 1;
        } else if (this.vid.msPlaybackRate) {
          this.vid.msPlaybackRate = 1;
        }
        break;
    }
  }

  public openFullscreen() {
    if (this.vid.requestFullscreen) {
      this.vid.requestFullscreen();
    } else if (this.vid.webkitRequestFullscreen) {
      this.vid.webkitRequestFullscreen();
    } else if (this.vid.msRequestFullscreen) {
      this.vid.msRequestFullscreen();
    }
  }
  
  public navigate(page: String): void {
    this.router.navigate([page]);
  }

  get wordId() { return (this.word && this.word.wordID) ? this.word.wordID : null }

}



