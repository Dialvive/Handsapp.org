import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Word } from 'src/app/_models/word';
import { WordCategory } from 'src/app/_models/wordCategory';
import { WordCategoryService } from 'src/app/_services/word-category/word-category.service';
import { WordService } from 'src/app/_services/word/word.service';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.css']
})
export class WordsComponent implements OnInit {
  public titleStr: string[] = ["Thematischer Wortindex","Índice temático de palabras", "Thematic index of words", "Index thématique des mots", "Indice tematico delle parole", "Índice temático de palavras"  ];
  public categories: WordCategory[] | any;
  public hits : string[] | any ;
  public words: Word[] | any;
  public name :string | any;
  
  constructor(private router: Router,
    private wordService: WordService,
    public appComponent: AppComponent,
    public wordCategoryService: WordCategoryService) { }

  ngOnInit(): void {
    this.appComponent.getLocale();
    this.getWordCategories();
    this.getWords();
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
        this.categories = response;
        this.sortCategories();
        //this.fillCategories()
      }, 
      err => this.appComponent.navigate("/404"));
  }

  //Gets all categories from the API and instanciates it globally.
  private getWords(): void {
    this.wordService.getWords().subscribe(
      response => {
        this.words = response;
        var lastID = this.categories.length;
        this.hits = new Array(lastID) ;
        this.sortByCategory();
      }, 
      err => this.appComponent.navigate("/404"));
  }

  //Sort strCat categories by name_es 
  private sortCategories(){
    this.categories.sort(function(a:any, b:any){
      if(a.name_es < b.name_es) { return -1; }
      if(a.name_es > b.name_es) { return 1; }
      return 0;
    })
  }

  public getCategoryByIdiom(cat:WordCategory, id:number) {
    var auxCat = new WordCategory(cat);
    return auxCat.getNameByIdiom(id);
    
  }
  public getWordByIdiom(word : Word, id:number){
    var auxWord = new Word(word);
    return auxWord.getTextByIdiom(id);
  }

  public sortByCategory(){
    for(var i = 0; i < this.hits.length-1 ; i++) {
      this.hits.splice(this.categories[i].ID, 1, this.getWordsByCategory(this.categories[i].ID) );
    }
  }

  public getWordsByCategory(cat : number) : Word[] {
    var arr = this.words.filter((i : Word) => i.word_category_ID == cat);
    return arr;
  }

}
