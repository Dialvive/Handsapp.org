import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

import { WordSearchResult } from 'src/app/_models/search';
import { Word } from 'src/app/_models/word';
import { WordCategory } from 'src/app/_models/wordCategory';
import { SearchService } from 'src/app/_services/search/search.service';
import { WordCategoryService } from 'src/app/_services/word-category/word-category.service';
import { WordSignService } from 'src/app/_services/word-sign/word-sign.service';
import { AppComponent } from '../../../app.component'

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements AfterViewInit {

  navigationExtras: any | NavigationExtras = {
    state: {
      value: null
    }
  };
  public strRes: string[] = ["suchergebnisse", "resultados de búsqueda", "search results", "résultats de recherche", "risultati di ricerca", "procurar resultados"];
  public oneRes: string[] = ["Ein Suchergebnis", "Un resultado de búsqueda", "A search result", "Un résultat de recherche", "Un risultato di ricerca", "Um resultado de pesquisa"];
  public noRes: string[] = ["Keine Ergebnisse für", "Sin resultados para", "No results for", "Aucun résultat pour", "Nessun risultato per", "Sem resultados para "];
  public nfRes: string[] = ["Definition nicht verfügbar", "Definición no disponible", "Definition not available", "Définition non disponible", "Definizione non disponibile", "Definição não disponível"]
  public strSearch: string[] = ["Suche in HandsApp","Buscar en HandsApp", "Search in HandsApp", "Rechercher dans HandsApp","Cerca in HandsApp", "Pesquisa no HandsApp" ];
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

  //A lifecycle hook that is called after Angular has fully initialized a component's view.
  async ngAfterViewInit() {
    await this.appComponent.getLocale();
    await this.getTxt();
    await this.getResult();
    await this.getWordCategories();
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
}
