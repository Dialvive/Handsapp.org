import { Component, OnInit } from '@angular/core';
import { Country } from '../../../_models/country';
import { CountryService} from '../../../_services/country/country.service';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';

declare var $: any;

@Component({
  selector: 'app-country-crud',
  templateUrl: './country-crud.component.html',
  styleUrls: ['./country-crud.component.css']
})


export class CountryCrudComponent implements OnInit {

  countries: Country[] | any;
  country: Country | any;
  countryForm: FormGroup;
  submitted = false;
  closeResult = '';
  modal: NgbModalRef;
  
  constructor(private countryService: CountryService, private formBuilder: FormBuilder, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.countryForm = this.formBuilder.group({
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
    this.getCountries();
  }

  getCountries() {
    this.countries = [];
    this.countryService.getCountries().subscribe(
      (res : any) => {
        this.countries = res.data;
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

  deleteCountry() {
    this.countryService.deleteCountry(this.country.ID).subscribe(
      res => {
        this.getCountries();
      },
      err => console.error(err)
    )
    this.modal.close();
  }

  createCountry() {
    this.submitted = true;
    if(this.countryForm.invalid) {
      console.log('Formulario Inválido');
      return;
    }
    this.countryService.createCountry(this.countryForm.value).subscribe(
      res => {
        this.getCountries()
      },
      err => console.error(err)
    )
    this.modal.close();
    this.submitted = false;
  }

  updateCountry(id) {
    this.submitted = true;
    if(this.countryForm.invalid) {
      console.log('Formulario Inválido');
      return;
    }
    this.countryService.updateCountry(this.countryForm.value, id).subscribe(
      res => {
        this.getCountries();
      },
      err => { 
        console.error(err);
      }
    )
    this.modal.close();
    this.submitted = false;
  }

  get f() { return this.countryForm.controls }

  openCreateModal(content) {
    this.countryForm.reset();
    this.modal = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openEditModal(content, country) {
    this.countryForm.reset();
    this.countryService.getCountry(country.ID).pipe(first()).subscribe(
      (res : any) => {
        this.country = res.data;
        this.countryForm.patchValue(res.data); 
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
    this.getCountry(id);
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
