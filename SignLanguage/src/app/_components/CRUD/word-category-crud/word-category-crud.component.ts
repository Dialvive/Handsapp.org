import { Component, OnInit } from '@angular/core';
import { WordCategory } from '../../../_models/wordCategory';
import { WordCategoryService} from '../../../_services/word-category/word-category.service';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';

declare var $: any;

@Component({
  selector: 'app-word-category-crud',
  templateUrl: './word-category-crud.component.html',
  styleUrls: ['./word-category-crud.component.css']
})

export class WordCategoryCrudComponent implements OnInit {

  wordCategories: WordCategory[]|any;
  wordCategory: WordCategory| any;
  wordCategoryForm: FormGroup;
  submitted = false;
  closeResult = '';
  modal: NgbModalRef;

  constructor(private wordCategoryService: WordCategoryService, private formBuilder: FormBuilder, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.wordCategoryForm = this.formBuilder.group({
      id:[''],
      nombre_de: ['',Validators.required],
      nombre_es: ['',Validators.required],
      nombre_en: ['',Validators.required],
      nombre_fr: ['',Validators.required],
      nombre_it: ['',Validators.required],
      nombre_pt: ['',Validators.required],
      modified: ['',Validators.required]
    })
    this.getWordCategories();
  }

  getWordCategories() {
    this.wordCategories = [];
    this.wordCategoryService.getWordCategories().subscribe(
      res => {
        this.wordCategories = res;
      },
      err => console.error(err)
    )
  }

  getWordCategory(id) {
    this.wordCategory = null;
    this.wordCategoryService.getWordCategory(id).subscribe(
      res => {
        this.wordCategory = res;
      },
      err => console.error(err)
    )
  }

  deleteWordCategory() {
    this.wordCategoryService.deleteCategory(this.wordCategory.id).subscribe(
      res => {
        this.getWordCategories();
      },
      err => console.error(err)
    )
    this.modal.close();
  }

  createWordCategory() {
    this.submitted = true;
    if(this.wordCategoryForm.invalid) {
      console.log('Formulario Inválido');
      return;
    }
    this.wordCategoryService.createWordCategory(this.wordCategoryForm.value).subscribe(
      res => {
        this.getWordCategories()
      },
      err => console.error(err)
    )
    this.modal.close();
    this.submitted = false;
  }

  updateWordCategory() {
    this.submitted = true;
    if(this.wordCategoryForm.invalid) {
      console.log('Formulario Inválido');
      return;
    }
    this.wordCategoryService.updateWordCategory(this.wordCategoryForm.value).subscribe(
      res => {
        this.getWordCategories();
      },
      err => console.error(err)
    )
    this.modal.close();
    this.submitted = false;
  }

  get f() { return this.wordCategoryForm.controls }

  openCreateModal(content) {
    this.wordCategoryForm.reset();
    this.modal = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openEditModal(content, id) {
    this.wordCategoryForm.reset();
    this.wordCategoryService.getWordCategory(id)
    .pipe(first())
    .subscribe(x => {
      this.wordCategory = x;
      this.wordCategoryForm.patchValue(x); } );

    this.modal = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openDeleteModal(content, id) {
    this.getWordCategory(id);
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
