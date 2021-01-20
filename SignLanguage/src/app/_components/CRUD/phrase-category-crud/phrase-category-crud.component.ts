import { Component, OnInit } from '@angular/core';
import { PhraseCategory } from '../../../_models/phraseCategory';
import { PhraseCategoryService} from '../../../_services/phrase-category/phrase-category.service';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';

declare var $: any;

@Component({
  selector: 'app-phrase-category-crud',
  templateUrl: './phrase-category-crud.component.html',
  styleUrls: ['./phrase-category-crud.component.css']
})

export class PhraseCategoryCrudComponent implements OnInit {

  phraseCategories: PhraseCategory[] | any;
  phraseCategory: PhraseCategory | any;
  phraseCategoryForm: FormGroup;
  submitted = false;
  closeResult = '';
  modal: NgbModalRef;
  
  constructor(private phraseCategoryService: PhraseCategoryService, private formBuilder: FormBuilder, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.phraseCategoryForm = this.formBuilder.group({
      id:[''],
      name_de: ['',Validators.required],
      name_es: ['',Validators.required],
      name_en: ['',Validators.required],
      name_fr: ['',Validators.required],
      name_it: ['',Validators.required],
      name_pt: ['',Validators.required],
      modified: ['']
    })
    this.getPhraseCategories();
  }

  getPhraseCategories() {
    this.phraseCategories = [];
    this.phraseCategoryService.getPhraseCategories().subscribe(
      (res : any) => {
        console.log(res.data);
        this.phraseCategories = res.data;
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

  deletePhraseCategory() {
    this.phraseCategoryService.deleteCategory(this.phraseCategory.ID).subscribe(
      res => {
        this.getPhraseCategories();
      },
      err => console.error(err)
    )
    this.modal.close();
  }

  createPhraseCategory() {
    this.submitted = true;
    if(this.phraseCategoryForm.invalid) {
      console.log('Formulario Inválido');
      return;
    }
    this.phraseCategoryService.createPhraseCategory(this.phraseCategoryForm.value).subscribe(
      res => {
        this.getPhraseCategories()
      },
      err => console.error(err)
    )
    this.modal.close();
    this.submitted = false;
  }

  updatePhraseCategory(id) {
    this.submitted = true;
    if(this.phraseCategoryForm.invalid) {
      console.log('Formulario Inválido');
      return;
    }
    console.log(this.phraseCategoryForm.value)
    this.phraseCategoryService.updatePhraseCategory(this.phraseCategoryForm.value, id).subscribe(
      res => {
        console.log('97-get phrase categories');
        this.getPhraseCategories();
      },
      err => { 
        console.error(err);
        //console.log('10 error get phrase categories');
      }
    )
    this.modal.close();
    this.submitted = false;
  }

  get f() { return this.phraseCategoryForm.controls }

  openCreateModal(content) {
    this.phraseCategoryForm.reset();
    this.modal = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openEditModal(content, wc) {
    console.log("OpenEditModal");
    this.phraseCategoryForm.reset();
    this.phraseCategoryService.getPhraseCategory(wc.ID).pipe(first()).subscribe(
      (res : any) => {
        console.log(res.data);
        this.phraseCategory = res.data;
        this.phraseCategoryForm.patchValue(res.data); 
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
    this.getPhraseCategory(id);
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
