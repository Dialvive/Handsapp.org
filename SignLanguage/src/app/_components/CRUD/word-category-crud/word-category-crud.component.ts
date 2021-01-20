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

  wordCategories: WordCategory[] | any;
  wordCategory: WordCategory | any;
  wordCategoryForm: FormGroup;
  submitted = false;
  closeResult = '';
  modal: NgbModalRef;
  
  constructor(private wordCategoryService: WordCategoryService, private formBuilder: FormBuilder, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.wordCategoryForm = this.formBuilder.group({
      id:[''],
      name_de: ['',Validators.required],
      name_es: ['',Validators.required],
      name_en: ['',Validators.required],
      name_fr: ['',Validators.required],
      name_it: ['',Validators.required],
      name_pt: ['',Validators.required],
      modified: ['']
    })
    this.getWordCategories();
  }

  getWordCategories() {
    this.wordCategories = [];
    this.wordCategoryService.getWordCategories().subscribe(
      (res : any) => {
        console.log(res.data);
        this.wordCategories = res.data;
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

  deleteWordCategory() {
    this.wordCategoryService.deleteCategory(this.wordCategory.ID).subscribe(
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

  updateWordCategory(id) {
    this.submitted = true;
    if(this.wordCategoryForm.invalid) {
      console.log('Formulario Inválido');
      return;
    }
    console.log(this.wordCategoryForm.value)
    this.wordCategoryService.updateWordCategory(this.wordCategoryForm.value, id).subscribe(
      res => {
        console.log('97-get word categories');
        this.getWordCategories();
      },
      err => { 
        console.error(err);
        //console.log('10 error get word categories');
      }
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

  openEditModal(content, wc) {
    console.log("OpenEditModal");
    this.wordCategoryForm.reset();
    this.wordCategoryService.getWordCategory(wc.ID).pipe(first()).subscribe(
      (res : any) => {
        console.log(res.data);
        this.wordCategory = res.data;
        this.wordCategoryForm.patchValue(res.data); 
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
