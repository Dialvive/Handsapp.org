import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { WordSearchResult } from 'src/app/_models/search';
import { Word } from 'src/app/_models/word';
import { WordCategory } from 'src/app/_models/wordCategory';
import { SearchService } from 'src/app/_services/search/search.service';
import { WordCategoryService } from 'src/app/_services/word-category/word-category.service';
import { WordSignService } from 'src/app/_services/word-sign/word-sign.service';
import { AppComponent } from '../../app.component'

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  navigationExtras: any | NavigationExtras = {
    state: {
      value: null
    }
  };
  public strRes: string[] = ["suchergebnisse", "resultados de búsqueda", "search results", "résultats de recherche", "risultati di ricerca", "procurar resultados"];
  public oneRes: string[] = ["Ein Suchergebnis", "Un resultado de búsqueda", "A search result", "Un résultat de recherche", "Un risultato di ricerca", "Um resultado de pesquisa"];
  public noRes: string[] = ["Keine Ergebnisse für", "Sin resultados para", "No results for", "Aucun résultat pour", "Nessun risultato per", "Sem resultados para "];
  public nfRes: String[] = ["Übersetzung nicht verfügbar", "Traducción no disponible", "Translation not available", "Traduction non disponible", "Traduzione non disponibile", "Tradução não disponível"]
  public txt: string | any;
  public categories: string[] | any;
  public definitions: string[] | any;
  public result: WordSearchResult | null = null;
  public ready: boolean = false;


  constructor(
    private route: ActivatedRoute,
    public appComponent: AppComponent,
    private searchService: SearchService,
    private wordCategoryService: WordCategoryService,
    private wordSignService: WordSignService,
    private router: Router,
  ) { }

  async ngOnInit() {
    await this.appComponent.getLocale();
    await this.getTxt();
    await this.getResult();
    await this.getWordCategories();
  }
  // navigate redirects faster through router
  async navigateItem(page: string, item: any) {
    await this.createVideoURLs(item, page);
  }

  //Gets the id and txt parameters from the URL and instanciates it globally.
  // I.E. route: https://handsapp.org/word?loc=es_LSM_MX&id=1&txt=Abeja
  //TODO: manage incorrect id's

  private async getTxt(): Promise<boolean> {
    var txt: string | null = this.route.snapshot.queryParamMap.get('txt');
    if (txt == null || txt == '' ) {
      //TODO: handle error
      this.txt = "Error";
      return false
    }
    this.txt = txt;
    return true;
  }

  //Gets every word category and instanciates them globally in a 2 dimensional array
  private async getResult(): Promise<boolean> {
    this.searchService.searchWords(this.txt, 50).subscribe(
      response => {

        this.result = response;
        return true;
      }, 
      err => console.log(err));
      return false;
  }

    //Gets every word category and instanciates them globally in a 2 dimensional array
    private async getWordCategories(): Promise<boolean> {
      this.wordCategoryService.getWordCategories().subscribe(
        response => {
          this.categories = new Array<String[]>(response.length)
          for (let i = 0; i < response.length; i++) {
            this.categories[i] = new WordCategory(response[i]).getNames();
          }
          this.ready = true;
          return true;
        }, 
        err => console.log(err));
        return false;
    }

  public getWordByIdiom(word : Word, id:number){
    var auxWord = new Word(word);
    return auxWord.getTextByIdiom(id);
  }

  public getDefinitionByIdiom(word: Word, id: number) {
    var auxWord = new Word(word);
    return auxWord.getDefByIdiom(id);
  }

  async createVideoURLs(id : any, page : string) {
    console.log("ENTRA CREATE VIDEOS URL")
    const pid = parseInt(id)
    const version: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const URL: string = "https://storage.googleapis.com/video.handsapp.org/" + "LSM" + "/words/";
    this.wordSignService.getWordSigns(pid).subscribe(
      response => {
        this.videos = new Array(response.length);
        for (let i = 0; i < response.length; i++) {
          this.videos[i] = URL + pid + '-' + version[i] + '.mp4';
          console.log("ITERACION = " + i );
        }
        console.log(this.videos);
      this.navigationExtras.state.value = this.videos;
      this.router.navigateByUrl(decodeURI(page), this.navigationExtras);
      },
      err => console.error(err));
  }
}
