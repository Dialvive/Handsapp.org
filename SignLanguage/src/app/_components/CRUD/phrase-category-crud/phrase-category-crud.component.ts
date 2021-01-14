import { Component, OnInit } from '@angular/core';
import { PhraseCategory } from '../../../_models/phraseCategory';
import { PhraseCategoryService} from '../../../_services/phrase-category/phrase-category.service';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-phrase-category-crud',
  templateUrl: './phrase-category-crud.component.html',
  styleUrls: ['./phrase-category-crud.component.css']
})
export class PhraseCategoryCrudComponent implements OnInit {
  phraseCategories: PhraseCategory[]|any;
  phraseCategory: PhraseCategory| any;
  phraseCategoryForm: FormGroup;
  submitted = false;
  closeResult = '';
  modal: NgbModalRef;
  
  constructor( private formBuilder: FormBuilder) { }
  
  ngOnInit(): void {
    this.phraseCategoryForm = this.formBuilder.group({
      id:[''],
      nombre_de: ['',Validators.required],
      nombre_es: ['',Validators.required],
      nombre_en: ['',Validators.required],
      nombre_fr: ['',Validators.required],
      nombre_it: ['',Validators.required],
      nombre_pt: ['',Validators.required],
      modified: ['',Validators.required]
    })
  }
}
