import { Component, OnInit } from '@angular/core';
import { SignLanguage } from '../../../_models/signLanguage';
import { SignLanguageService} from '../../../_services/sign-language/sign-language.service';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-sign-language-crud',
  templateUrl: './sign-language-crud.component.html',
  styleUrls: ['./sign-language-crud.component.css']
})
export class SignLanguageCrudComponent implements OnInit {

  signLanguages: SignLanguage[] | any;
  signLanguage: SignLanguage | any;
  signLanguageForm: FormGroup;
  submitted = false;
  closeResult = '';
  modal: NgbModalRef;
  
  constructor(private signLanguageService: SignLanguageService, private formBuilder: FormBuilder, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.signLanguageForm = this.formBuilder.group({
      id:[''],
      name_de: ['',Validators.required],
      name_es: ['',Validators.required],
      name_en: ['',Validators.required],
      name_fr: ['',Validators.required],
      name_it: ['',Validators.required],
      name_pt: ['',Validators.required],
      abbreviation: ['',Validators.required],
      modified: ['']
    })
    this.getSignLanguages();
  }

  getSignLanguages() {
    this.signLanguages = [];
    this.signLanguageService.getSignLanguages().subscribe(
      (res : any) => {
        this.signLanguages = res.data;
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

  deleteSignLanguage() {
    this.signLanguageService.deleteSignLanguage(this.signLanguage.ID).subscribe(
      res => {
        this.getSignLanguages();
      },
      err => console.error(err)
    )
    this.modal.close();
  }

  createSignLanguage() {
    this.submitted = true;
    if(this.signLanguageForm.invalid) {
      console.log('Formulario Inválido');
      return;
    }
    this.signLanguageService.createSignLanguage(this.signLanguageForm.value).subscribe(
      res => {
        this.getSignLanguages()
      },
      err => console.error(err)
    )
    this.modal.close();
    this.submitted = false;
  }

  updateSignLanguage(id) {
    this.submitted = true;
    if(this.signLanguageForm.invalid) {
      console.log('Formulario Inválido');
      return;
    }
    this.signLanguageService.updateSignLanguage(this.signLanguageForm.value, id).subscribe(
      res => {
        this.getSignLanguages();
      },
      err => { 
        console.error(err);
      }
    )
    this.modal.close();
    this.submitted = false;
  }

  get f() { return this.signLanguageForm.controls }

  openCreateModal(content) {
    this.signLanguageForm.reset();
    this.modal = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openEditModal(content, signLanguage) {
    this.signLanguageForm.reset();
    this.signLanguageService.getSignLanguage(signLanguage.ID).pipe(first()).subscribe(
      (res : any) => {
        this.signLanguage = res.data;
        this.signLanguageForm.patchValue(res.data); 
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
    this.getSignLanguage(id);
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