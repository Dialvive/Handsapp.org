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
  public strTitle: string[] = ["Thematischer Wortindex", "Índice temático de palabras", "Thematic index of words", "Index thématique des mots", "Indice tematico delle parole", "Índice temático de palavras"];
  public prox: string[] = ["Kommt bald!", "¡Próximamente!", "Coming soon!", "Bientôt disponible!", "Prossimamente!", "Em breve!"]
  public categories: WordCategory[] | any;
  public hits: string[] | any;
  public words: Word[] | any;
  public name: string | any;
  public progress: number = 0;

  constructor(private router: Router,
    private wordService: WordService,
    public appComponent: AppComponent,
    public wordCategoryService: WordCategoryService) { }

  ngOnInit(): void {
    this.getWords();
  }

  //Gets all categories from the API and instanciates it globally.
  private async getWordCategories(): Promise<boolean> {
    this.wordCategoryService.getWordCategories().subscribe(
      response => {
        this.categories = response;
        //this.fillCategories()
        this.progress += 25;
        return true;
      },
      err => {
        this.appComponent.navigateParams("/404", this.appComponent.locale, '', '');
        return false;
      });
      return false;
  }

  //Gets all categories from the API and instanciates it globally.
  private async getWords() {
    this.appComponent.getLocale();
    await this.getWordCategories();
    this.wordService.getWords().subscribe(
      response => {
        this.words = response;
        this.progress += 50;
        var lastID = this.categories.length;
        this.hits = new Array(lastID);
        this.sortByCategory();
        this.progress += 25;
      }, 
      err => this.appComponent.navigateParams("/404", this.appComponent.locale, '', ''));
  }

  //Sort strCat categories by name_es 
  public sortCategories(lang: any) {
    var langAux: number = parseInt(lang);

    switch (langAux) {
      case 0: {
        this.categories?.sort(function (a: any, b: any) {
          if (a.name_de < b.name_de) { return -1; }
          if (a.name_de > b.name_de) { return 1; }
          return 0;
        })

        break;
      }
      case 1: {
        this.categories?.sort(function (a: any, b: any) {
          if (a.name_es < b.name_es) { return -1; }
          if (a.name_es > b.name_es) { return 1; }
          return 0;
        })

        break;
      }
      case 2: {
        this.categories?.sort(function (a: any, b: any) {
          if (a.name_en < b.name_en) { return -1; }
          if (a.name_en > b.name_en) { return 1; }
          return 0;
        })

        break;
      }
      case 3: {
        this.categories?.sort(function (a: any, b: any) {
          if (a.name_fr < b.name_fr) { return -1; }
          if (a.name_fr > b.name_fr) { return 1; }
          return 0;
        })

        break;
      }
      case 4: {
        this.categories?.sort(function (a: any, b: any) {
          if (a.name_it < b.name_it) { return -1; }
          if (a.name_it > b.name_it) { return 1; }
          return 0;
        })

        break;
      }
      case 5: {
        this.categories?.sort(function (a: any, b: any) {
          if (a.name_pt < b.name_pt) { return -1; }
          if (a.name_pt > b.name_pt) { return 1; }

          return 0;
        })
        break;
      }
      default: {
        this.categories?.sort(function (a: any, b: any) {
          if (a.name_en < b.name_en) { return -1; }
          if (a.name_en > b.name_en) { return 1; }

          return 0;
        })
      }
    }
  }

  public getCategoryByIdiom(cat: WordCategory, id: number) {
    var auxCat = new WordCategory(cat);
    return auxCat.getNameByIdiom(id);
  }
  public getWordByIdiom(word: Word, id: number) {
    var auxWord = new Word(word);
    return auxWord.getTextByIdiom(id);
  }

  public sortByCategory() {
    try {
      for (var i = 0; i < this.hits?.length - 1; i++) {
        this.hits?.splice(this.categories[i]?.ID, 1, this.getWordsByCategory(this.categories[i]?.ID));
      }
    } catch (e) {
      console.log(e)
    }
  }

  public getWordsByCategory(cat: number): Word[] {
    var arr = this.words.filter((i: Word) => i.word_category_ID == cat);
    return arr;
  }

}
