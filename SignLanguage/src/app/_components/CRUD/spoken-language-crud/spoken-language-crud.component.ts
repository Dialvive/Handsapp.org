import { Component, OnInit } from '@angular/core';
import { SpokenLanguage } from '../../../_models/spokenLanguage';
import { SpokenLanguageService} from '../../../_services/spoken-language/spoken-language.service';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-spoken-language-crud',
  templateUrl: './spoken-language-crud.component.html',
  styleUrls: ['./spoken-language-crud.component.css']
})
export class SpokenLanguageCrudComponent implements OnInit {

  spokenLanguages: SpokenLanguage[] | any;
  spokenLanguage: SpokenLanguage | any;
  spokenLanguageForm: FormGroup;
  submitted = false;
  closeResult = '';
  modal: NgbModalRef;
  
  constructor(private spokenLanguageService: SpokenLanguageService, private formBuilder: FormBuilder, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.spokenLanguageForm = this.formBuilder.group({
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
    this.getSpokenLanguages();
  }

  getSpokenLanguages() {
    this.spokenLanguages = [];
    this.spokenLanguageService.getSpokenLanguages().subscribe(
      (res : any) => {
        this.spokenLanguages = res.data;
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

  deleteSpokenLanguage() {
    this.spokenLanguageService.deleteSpokenLanguage(this.spokenLanguage.ID).subscribe(
      res => {
        this.getSpokenLanguages();
      },
      err => console.error(err)
    )
    this.modal.close();
  }

  createSpokenLanguage() {
    this.submitted = true;
    if(this.spokenLanguageForm.invalid) {
      console.log('Formulario Inválido');
      return;
    }
    this.spokenLanguageService.createSpokenLanguage(this.spokenLanguageForm.value).subscribe(
      res => {
        this.getSpokenLanguages()
      },
      err => console.error(err)
    )
    this.modal.close();
    this.submitted = false;
  }

  updateSpokenLanguage(id) {
    this.submitted = true;
    if(this.spokenLanguageForm.invalid) {
      console.log('Formulario Inválido');
      return;
    }
    this.spokenLanguageService.updateSpokenLanguage(this.spokenLanguageForm.value, id).subscribe(
      res => {
        this.getSpokenLanguages();
      },
      err => { 
        console.error(err);
      }
    )
    this.modal.close();
    this.submitted = false;
  }

  get f() { return this.spokenLanguageForm.controls }

  openCreateModal(content) {
    this.spokenLanguageForm.reset();
    this.modal = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openEditModal(content, spokenLanguage) {
    this.spokenLanguageForm.reset();
    this.spokenLanguageService.getSpokenLanguage(spokenLanguage.ID).pipe(first()).subscribe(
      (res : any) => {
        this.spokenLanguage = res.data;
        this.spokenLanguageForm.patchValue(res.data); 
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
    this.getSpokenLanguage(id);
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