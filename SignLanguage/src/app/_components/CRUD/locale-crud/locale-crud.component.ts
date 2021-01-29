import { Component, OnInit } from '@angular/core';
import { Locale } from '../../../_models/locale';
import { LocaleService } from '../../../_services/locale/locale.service';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { Country } from '../../../_models/country';
import { CountryService} from '../../../_services/country/country.service';
import { SpokenLanguage } from 'src/app/_models/spokenLanguage';
import { SignLanguage } from 'src/app/_models/signLanguage';
import { SpokenLanguageService } from 'src/app/_services/spoken-language/spoken-language.service';
import { SignLanguageService } from 'src/app/_services/sign-language/sign-language.service';

declare var $: any;

@Component({
  selector: 'app-locale-crud',
  templateUrl: './locale-crud.component.html',
  styleUrls: ['./locale-crud.component.css']
})
export class LocaleCrudComponent implements OnInit {
  
    locales: Locale[] | any;
    locale: Locale | any;
    localeForm: FormGroup;
    submitted = false;
    closeResult = '';
    modal: NgbModalRef;
    //Objetos de apoyo de otros modelos
    countries: Country[] | any;
    country: Country | any;
    spokenLanguage: SpokenLanguage | any;
    spokenLanguages: SpokenLanguage[] | any;
    signLanguage: SignLanguage | any;
    signLanguages: SignLanguage[] | any;

    constructor(private signLanguageService: SignLanguageService, private spokenLanguageService: SpokenLanguageService ,private countryService: CountryService, private localeService: LocaleService, private formBuilder: FormBuilder, private modalService: NgbModal) { }

    ngOnInit(): void {
      this.localeForm = this.formBuilder.group({
        ID:[''],
        country_ID: ['',Validators.required],
        spoken_language_ID:  ['',Validators.required],
        sign_language_ID:  ['',Validators.required],
        modified: ['']
      })
      this.getLocales();
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

    deleteLocale() {
      this.localeService.deleteLocale(this.locale.ID).subscribe(
        res => {
          this.getLocales();
        },
        err => console.error(err)
      )
      this.modal.close();
    }

    createLocale() {
      //console.log(id);
      this.submitted = true;
      console.log(this.localeForm.value)
      if(this.localeForm.invalid) {
        console.log('Formulario Inválido');
        return;
      }
      this.localeService.createLocale(this.localeForm.value).subscribe(
        res => {
          this.getLocales()
        },
        err => console.error(err)
      )
      this.modal.close();
      this.submitted = false;
    }

    updateLocale(id) {
      this.submitted = true;
      if(this.localeForm.invalid) {
        console.log('Formulario Inválido');
        return;
      }
      this.localeService.updateLocale(this.localeForm.value, id).subscribe(
        res => {
          this.getLocales();
        },
        err => { 
          console.error(err);
        }
      )
      this.modal.close();
      this.submitted = false;
    }

    get f() { return this.localeForm.controls }

    openCreateModal(content) {
      this.localeForm.reset();
      this.getCountries();
      this.getSignLanguages();
      this.getSpokenLanguages()
      this.modal = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
      this.modal.result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }

    openEditModal(content, locale) {
      this.localeForm.reset();
      this.getCountries();
      this.getSignLanguages();
      this.getSpokenLanguages()
      this.localeService.getLocale(locale.ID).pipe(first()).subscribe(
        (res : any) => {
          this.locale = res.data;
          this.localeForm.patchValue(res.data); 
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
      this.getLocale(id);
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

}