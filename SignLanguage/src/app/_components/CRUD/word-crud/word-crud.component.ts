import { Component, OnInit } from '@angular/core';
import { Word } from '../../../_models/word';
import { WordService} from '../../../_services/word/word.service';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { Locale } from 'src/app/_models/locale';
import { LocaleService } from 'src/app/_services/locale/locale.service'
import { WordCategoryService } from 'src/app/_services/word-category/word-category.service';
import { WordCategory } from 'src/app/_models/wordCategory';
import { Country } from '../../../_models/country';
import { CountryService} from '../../../_services/country/country.service';
import { SpokenLanguage } from 'src/app/_models/spokenLanguage';
import { SignLanguage } from 'src/app/_models/signLanguage';
import { SpokenLanguageService } from 'src/app/_services/spoken-language/spoken-language.service';
import { SignLanguageService } from 'src/app/_services/sign-language/sign-language.service';

declare var $: any;

@Component({
  selector: 'app-word-crud',
  templateUrl: './word-crud.component.html',
  styleUrls: ['./word-crud.component.css']
})
export class WordCrudComponent implements OnInit {

  words: Word[] | any;
  word: Word | any;
  wordForm: FormGroup;
  submitted = false;
  closeResult = '';
  modal: NgbModalRef;
  locale: Locale | any;
  locales: Locale[] | any;
  wordCategory: WordCategory | any;
  wordCategories: WordCategory[] | any;
  wordCategoriesStr: any[];
  localesStr: any[];
  //Objetos de apoyo de otros modelos
  countries: Country[] | any;
  country: Country | any;
  spokenLanguage: SpokenLanguage | any;
  spokenLanguages: SpokenLanguage[] | any;
  signLanguage: SignLanguage | any;
  signLanguages: SignLanguage[] | any;
  countriesStr: any[];
  spokenLanguagesStr: any[];
  signLanguagesStr: any[];


  constructor(private signLanguageService: SignLanguageService, 
    private spokenLanguageService: SpokenLanguageService ,
    private countryService: CountryService, 
    private wordService: WordService, 
    private wordCategoryService: WordCategoryService , 
    private localeService: LocaleService, 
    private formBuilder: FormBuilder, 
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.wordForm = this.formBuilder.group({
      ID:[''],
      locale_ID: ['',Validators.required],
      word_category_ID: ['',Validators.required],
      text_de: ['',Validators.required],
      text_es: ['',Validators.required],
      text_en: ['',Validators.required],
      text_fr: ['',Validators.required],
      text_it: ['',Validators.required],
      text_pt: ['',Validators.required],
      context_de: ['',Validators.required],
      context_es: ['',Validators.required],
      context_en: ['',Validators.required],
      context_fr: ['',Validators.required],
      context_it: ['',Validators.required],
      context_pt: ['',Validators.required],
      definition_de: ['',Validators.required],
      definition_es: ['',Validators.required],
      definition_en: ['',Validators.required],
      definition_fr: ['',Validators.required],
      definition_it: ['',Validators.required],
      definition_pt: ['',Validators.required],
      modified: ['']
    })
    this.getLocales();
    this.getWordCategories();
    this.getWords();
  }

  getLocales() {
    this.locales = [];
    this.localeService.getLocales().subscribe(
      (res : any) => {
        console.log(res.data);
        this.locales = res.data;
      },
      err => console.error(err)
    )
  }

  getLocale(id) {
    this.locale = null;
    this.localeService.getLocale(id).subscribe(
      (res: any) => {
        this.locale = res.data;
      },
      err => console.error(err)
    )
  }

  getWordCategories() {
    this.wordCategories = [];
    this.wordCategoryService.getWordCategories().subscribe(
      (res : any) => {
        console.log(res.data);
        this.wordCategories = res.data;
        this.getWordCategoriesStr();
      },
      err => console.error(err)
    )
  }

  getWordCategory(id) {
    this.wordCategory = null;
    this.wordCategoryService.getWordCategory(id).subscribe(
      (res: any) => {
        this.wordCategory = res.data;
      },
      err => console.error(err)
    )
  }

  getWordCategoriesStr() {
    var lastID = this.wordCategories[this.wordCategories.length-1].ID;
    this.wordCategoriesStr = new Array(lastID) ;
    for(var i = 0; i < this.wordCategories.length ; i++) {
      this.wordCategoriesStr.splice(this.wordCategories[i].ID, 1, [
                                                          this.wordCategories[i].name_de, 
                                                          this.wordCategories[i].name_es, 
                                                          this.wordCategories[i].name_en, 
                                                          this.wordCategories[i].name_fr, 
                                                          this.wordCategories[i].name_it, 
                                                          this.wordCategories[i].name_pt
                                                        ]);
    }
    console.log(this.wordCategoriesStr[1][1]);
  }

  getWords() {
    this.words = [];
    this.wordService.getWords().subscribe(
      (res : any) => {
        this.words = res.data;
      },
      err => console.error(err)
    )
  }

  getWord(id) {
    this.word = null;
    this.wordService.getWord(id).subscribe(
      (res: any) => {
        this.word = res.data;
      },
      err => console.error(err)
    )
  }

  deleteWord() {
    this.wordService.deleteWord(this.word.ID).subscribe(
      res => {
        this.getWords();
      },
      err => console.error(err)
    )
    this.modal.close();
  }

  createWord() {
    this.submitted = true;
    if(this.wordForm.invalid) {
      console.log('Formulario Inválido');
      return;
    }
    this.wordService.createWord(this.wordForm.value).subscribe(
      res => {
        this.getWords()
      },
      err => console.error(err)
    )
    this.modal.close();
    this.submitted = false;
  }

  updateWord(id) {
    this.submitted = true;
    if(this.wordForm.invalid) {
      console.log('Formulario Inválido');
      return;
    }
    this.wordService.updateWord(this.wordForm.value, id).subscribe(
      res => {
        this.getWords();
      },
      err => { 
        console.error(err);
      }
    )
    this.modal.close();
    this.submitted = false;
  }

  get f() { return this.wordForm.controls }

  openCreateModal(content) {
    this.wordForm.reset();
    this.getWordCategories();
    this.getLocales();
    this.modal = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openEditModal(content, word) {
    this.wordForm.reset();
    this.getWordCategories();
    this.getLocales();
    this.wordService.getWord(word.ID).pipe(first()).subscribe(
      (res : any) => {
        this.word = res.data;
        this.wordForm.patchValue(res.data); 
      },
      err => console.error(err)
    );

    this.modal = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    
    this.modal.result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      }, 
      (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openDeleteModal(content, id) {
    this.getWord(id);
    this.modal = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  // Funciones de apoyo de otros modelos:

  getCountries() {
    this.countries = [];
    this.countryService.getCountries().subscribe(
      (res : any) => {
        this.countries = res.data;
        console.log(this.countries);
        this.getCountriesStr();
      },
      err => console.error(err)
    )
  }

  getCountry(id) {
    this.country = null;
    this.countryService.getCountry(id).subscribe(
      (res: any) => {
        this.country = res.data;
      },
      err => console.error(err)
    )
  }

  getCountriesStr() {
    var lastID = this.countries[this.countries.length-1].ID;
    this.countriesStr = new Array(lastID) ;
    console.log(this.countriesStr);
    for(var i = 0; i < this.countries.length ; i++) {
      this.countriesStr.splice(this.countries[i].ID, 1, [
                                                          this.countries[i].name_de, 
                                                          this.countries[i].name_es, 
                                                          this.countries[i].name_en, 
                                                          this.countries[i].name_fr, 
                                                          this.countries[i].name_it, 
                                                          this.countries[i].name_pt
                                                        ]);
    }
  }

  getSpokenLanguages() {
    this.spokenLanguages = [];
    this.spokenLanguageService.getSpokenLanguages().subscribe(
      (res : any) => {
        this.spokenLanguages = res.data;
        this.getSpokenStr();
      },
      err => console.error(err)
    )
  }

  getSpokenLanguage(id) {
    this.spokenLanguage = null;
    this.spokenLanguageService.getSpokenLanguage(id).subscribe(
      (res: any) => {
        this.spokenLanguage = res.data;
      },
      err => console.error(err)
    )
  }

  getSpokenStr() {
    var lastID = this.spokenLanguages[this.spokenLanguages.length-1].ID;
    this.spokenLanguagesStr = new Array(lastID) ;
    console.log(this.spokenLanguagesStr);
    for(var i = 0; i < this.spokenLanguages.length ; i++) {
      this.spokenLanguagesStr.splice(this.spokenLanguages[i].ID, 1, [
                                                          this.spokenLanguages[i].name_de, 
                                                          this.spokenLanguages[i].name_es, 
                                                          this.spokenLanguages[i].name_en, 
                                                          this.spokenLanguages[i].name_fr, 
                                                          this.spokenLanguages[i].name_it, 
                                                          this.spokenLanguages[i].name_pt
                                                        ]);
    }
  }

  getSignLanguages() {
    this.signLanguages = [];
    this.signLanguageService.getSignLanguages().subscribe(
      (res : any) => {
        this.signLanguages = res.data;
        this.getSignStr();
      },
      err => console.error(err)
    )
  }

  getSignLanguage(id) {
    this.signLanguage = null;
    this.signLanguageService.getSignLanguage(id).subscribe(
      (res: any) => {
        this.signLanguage = res.data;
      },
      err => console.error(err)
    )
  }

  getSignStr() {
    var lastID = this.signLanguages[this.signLanguages.length-1].ID;
    this.signLanguagesStr = new Array(lastID) ;
    console.log(this.signLanguagesStr);
    for(var i = 0; i < this.signLanguages.length ; i++) {
      this.signLanguagesStr.splice(this.signLanguages[i].ID, 1, [
                                                          this.signLanguages[i].name_de, 
                                                          this.signLanguages[i].name_es, 
                                                          this.signLanguages[i].name_en, 
                                                          this.signLanguages[i].name_fr, 
                                                          this.signLanguages[i].name_it, 
                                                          this.signLanguages[i].name_pt
                                                        ]);
    }
  }


}
