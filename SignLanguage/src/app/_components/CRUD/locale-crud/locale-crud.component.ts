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
    countriesStr: any[];
    spokenLanguagesStr: any[];
    signLanguagesStr: any[];

    constructor(
      private signLanguageService: SignLanguageService, private countryService: CountryService, private spokenLanguageService: SpokenLanguageService, private localeService: LocaleService, private formBuilder: FormBuilder, private modalService: NgbModal) { }

    ngOnInit(): void {
      this.localeForm = this.formBuilder.group({
        ID:[''],
        country_ID: ['',Validators.required],
        spoken_language_ID:  ['',Validators.required],
        sign_language_ID:  ['',Validators.required],
        modified: ['']
      })
      this.getLocales();
      this.getCountries();
      this.getSpokenLanguages();
      this.getSignLanguages();
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