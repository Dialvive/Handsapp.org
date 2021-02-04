import { Component, OnInit } from '@angular/core';
import { Phrase } from '../../../_models/phrase';
import { PhraseService} from '../../../_services/phrase/phrase.service';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { Locale } from 'src/app/_models/locale';
import { LocaleService } from 'src/app/_services/locale/locale.service'
import { PhraseCategoryService } from 'src/app/_services/phrase-category/phrase-category.service';
import { PhraseCategory } from 'src/app/_models/phraseCategory';

declare var $: any;

@Component({
  selector: 'app-phrase-crud',
  templateUrl: './phrase-crud.component.html',
  styleUrls: ['./phrase-crud.component.css']
})
export class PhraseCrudComponent implements OnInit {

  phrases: Phrase[] | any;
  phrase: Phrase | any;
  phraseForm: FormGroup;
  submitted = false;
  closeResult = '';
  modal: NgbModalRef;
  locale: Locale | any;
  locales: Locale[] | any;
  phraseCategory: PhraseCategory | any;
  phraseCategories: PhraseCategory[] | any;
  phraseCategoriesStr: any[];
  localesStr: any[];

  constructor(private phraseService: PhraseService, private phraseCategoryService: PhraseCategoryService , private localeService: LocaleService, private formBuilder: FormBuilder, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.phraseForm = this.formBuilder.group({
      ID:[''],
      locale_ID: ['',Validators.required],
      phrase_category_ID: ['',Validators.required],
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
      modified: ['']
    })
    this.getLocales();
    this.getPhraseCategories();
    this.getPhrases();
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

  getPhraseCategories() {
    this.phraseCategories = [];
    this.phraseCategoryService.getPhraseCategories().subscribe(
      (res : any) => {
        console.log(res.data);
        this.phraseCategories = res.data;
        this.getPhraseCategoriesStr();
      },
      err => console.error(err)
    )
  }

  getPhraseCategory(id) {
    this.phraseCategory = null;
    this.phraseCategoryService.getPhraseCategory(id).subscribe(
      (res: any) => {
        this.phraseCategory = res.data;
      },
      err => console.error(err)
    )
  }

  getPhraseCategoriesStr() {
    var lastID = this.phraseCategories[this.phraseCategories.length-1].ID;
    this.phraseCategoriesStr = new Array(lastID) ;
    console.log("HOLA");
    
    for(var i = 0; i < this.phraseCategories.length ; i++) {
      this.phraseCategoriesStr.splice(this.phraseCategories[i].ID, 1, [
                                                          this.phraseCategories[i].name_de, 
                                                          this.phraseCategories[i].name_es, 
                                                          this.phraseCategories[i].name_en, 
                                                          this.phraseCategories[i].name_fr, 
                                                          this.phraseCategories[i].name_it, 
                                                          this.phraseCategories[i].name_pt
                                                        ]);
    }
    console.log(this.phraseCategoriesStr[1][1]);
  }

  getPhrases() {
    this.phrases = [];
    this.phraseService.getPhrases().subscribe(
      (res : any) => {
        this.phrases = res.data;
      },
      err => console.error(err)
    )
  }

  getPhrase(id) {
    this.phrase = null;
    this.phraseService.getPhrase(id).subscribe(
      (res: any) => {
        this.phrase = res.data;
      },
      err => console.error(err)
    )
  }

  deletePhrase() {
    this.phraseService.deletePhrase(this.phrase.ID).subscribe(
      res => {
        this.getPhrases();
      },
      err => console.error(err)
    )
    this.modal.close();
  }

  createPhrase() {
    this.submitted = true;
    if(this.phraseForm.invalid) {
      console.log('Formulario Inválido');
      return;
    }
    this.phraseService.createPhrase(this.phraseForm.value).subscribe(
      res => {
        this.getPhrases()
      },
      err => console.error(err)
    )
    this.modal.close();
    this.submitted = false;
  }

  updatePhrase(id) {
    this.submitted = true;
    if(this.phraseForm.invalid) {
      console.log('Formulario Inválido');
      return;
    }
    this.phraseService.updatePhrase(this.phraseForm.value, id).subscribe(
      res => {
        this.getPhrases();
      },
      err => { 
        console.error(err);
      }
    )
    this.modal.close();
    this.submitted = false;
  }

  get f() { return this.phraseForm.controls }

  openCreateModal(content) {
    this.phraseForm.reset();
    this.getPhraseCategories();
    this.getLocales();
    this.modal = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openEditModal(content, phrase) {
    this.phraseForm.reset();
    this.getPhraseCategories();
    this.getLocales();
    this.phraseService.getPhrase(phrase.ID).pipe(first()).subscribe(
      (res : any) => {
        this.phrase = res.data;
        this.phraseForm.patchValue(res.data); 
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
    this.getPhrase(id);
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

}
