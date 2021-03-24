import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WordSearchResult } from 'src/app/_models/search';
import { Word } from 'src/app/_models/word';
import { WordCategory } from 'src/app/_models/wordCategory';
import { SearchService } from 'src/app/_services/search/search.service';
import { WordCategoryService } from 'src/app/_services/word-category/word-category.service';
import { AppComponent } from '../../app.component'

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  public strRes: string[] = ["Suchergebnisse", "Resultados de búsqueda", "Search results", "Résultats de recherche", "Risultati di ricerca", "Procurar Resultados"];

  public txt: string | any;
  public categories: string[][] | any;
  public result: WordSearchResult | any;
  public ready: boolean = false;
  public error: string | any;

  constructor(    
    private route: ActivatedRoute,
    public appComponent: AppComponent,
    private searchService: SearchService,
    private wordCategoryService: WordCategoryService,
  ) { }

  ngOnInit(): void {
    this.appComponent.getLocale();
    this.getTxt();
    this.getResults();
    this.getWordCategories();
  }

    //Gets the id and txt parameters from the URL and instanciates it globally.
  // I.E. route: https://handsapp.org/word?loc=es_LSM_MX&id=1&txt=Abeja
  //TODO: manage incorrect id's
  private getTxt(): void {
    this.txt = this.route.snapshot.queryParamMap.get('txt');
    if (this.txt == null || this.txt == '' ) {
      this.appComponent.navigateParams("/", this.appComponent.locale, "", this.txt);
    }
  }

  //Gets a relevance ordered array of Words from the API and instanciates it globally.
  //TODO: get phrase results
  private getResults(): void {
    this.searchService.searchWords(this.txt, 20).subscribe(
      response => {
        this.result = new WordSearchResult(response);
      }, 
      err => this.appComponent.navigateParams("/404", this.appComponent.locale, "", this.txt));
  }

  //Gets every word category and instanciates them globally in a 2 dimensional array
  private getWordCategories(): void {
    this.wordCategoryService.getWordCategories().subscribe(
      response => {
        this.categories = new Array(response.length)
        for (let i = 0; i < response.length; i++) {
          this.categories[i] = response[i].getNames();
        }
      }, 
      err => console.log(err));
  }
}
