import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { WordCategory } from 'src/app/_models/wordCategory';
import { WordCategoryService } from 'src/app/_services/word-category/word-category.service';
import { WordService } from 'src/app/_services/word/word.service';
import { CategoriesComponent } from '../categories/categories.component';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.css']
})
export class WordsComponent implements OnInit {
  public titleStr: string[] = ["Thematischer Wortindex","Índice temático de palabras", "Thematic index of words", "Index thématique des mots", "Indice tematico delle parole", "Índice temático de palavras"  ];
  public strCat: WordCategory[] | any;
  public categories: string[] | any;

  constructor(private router: Router,
    private wordService: WordService,
    public appComponent: AppComponent,
    public wordCategoryService: WordCategoryService) { }

  ngOnInit(): void {
    this.appComponent.getLocale();
    this.getWordCategories();
  }

  // navigate redirects faster through router
  public navigate(page: String): void {
    this.router.navigate([page]);
  }

  // navigate redirects faster through router with id & txt parameters
  public navigateIdTxt(page: String, idP: String, txtP: String): void {
    this.router.navigate([page], {queryParams: {id: idP, txt: txtP}});
  }
  
  //Gets all categories from the API and instanciates it globally.
  private getWordCategories(): void {
    this.wordCategoryService.getWordCategories().subscribe(
      response => {
        this.strCat = response;
        this.sortCategories();
        this.fillCategories()
      }, 
      err => this.appComponent.navigate("/404"));
  }

  //Sort strCat categories by name_es 
  private sortCategories(){
    this.strCat.sort(function(a:any, b:any){
      if(a.name_es < b.name_es) { return -1; }
      if(a.name_es > b.name_es) { return 1; }
      return 0;
    })
  }

  //Create a second array of all languages of the categories
  private fillCategories(){
    this.categories = new Array<String[]>(this.strCat.length)
    for (let i = 0; i < this.strCat.length; i++) {
      this.categories[i] = new WordCategory(this.strCat[i]).getNames();
    }
  }

}
