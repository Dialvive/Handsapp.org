import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
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
  public result: WordSearchResult | any;
  public videos: String[] | any;

  constructor(
    private route: ActivatedRoute,
    public appComponent: AppComponent,
    private searchService: SearchService,
    private wordCategoryService: WordCategoryService,
    private wordSignService: WordSignService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.appComponent.getLocale();
    this.getTxt();
    this.getResults();
    this.getWordCategories();
  }
  // navigate redirects faster through router
  async navigateItem(page: string, item: any) {
    await this.createVideoURLs(item, page);
  }

  //Gets the id and txt parameters from the URL and instanciates it globally.
  // I.E. route: https://handsapp.org/word?loc=es_LSM_MX&id=1&txt=Abeja
  //TODO: manage incorrect id's
  private getTxt(): void {
    this.txt = this.route.snapshot.queryParamMap.get('txt');
    //console.log("EL MONSTRUE: " + this.txt);
    if (this.txt == null || this.txt == '') {

      //this.appComponent.navigateParams("/", this.appComponent.locale, "", this.txt);
    }
  }

  //Gets a relevance ordered array of Words from the API and instanciates it globally.
  //TODO: get phrase results
  private getResults(): void {
    this.searchService.searchWords(this.txt, 50).subscribe(
      response => {
        this.result = new WordSearchResult(response);
      },
      err => this.appComponent.navigateParams("/404", this.appComponent.locale, "", this.txt));
  }

  //Gets every word category and instanciates them globally in a 2 dimensional array
  private getWordCategories(): void {
    this.wordCategoryService.getWordCategories().subscribe(
      response => {
        this.categories = new Array<String[]>(response.length)
        for (let i = 0; i < response.length; i++) {
          this.categories[i] = new WordCategory(response[i]).getNames();
        }
      },
      err => console.log(err));
    console.log(this.categories)
  }

  public getWordByIdiom(word: Word, id: number) {
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
