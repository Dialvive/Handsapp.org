import { Component, OnInit } from '@angular/core';
import { Region } from '../../../_models/region';
import { RegionService } from '../../../_services/region/region.service';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { Country } from '../../../_models/country';
import { CountryService} from '../../../_services/country/country.service';

declare var $: any;

@Component({
  selector: 'app-region-crud',
  templateUrl: './region-crud.component.html',
  styleUrls: ['./region-crud.component.css']
})


export class RegionCrudComponent implements OnInit {
  countries: Country[] | any;
  country: Country | any;
  regions: Region[] | any;
  region: Region | any;
  regionForm: FormGroup;
  submitted = false;
  closeResult = '';
  modal: NgbModalRef;
  countriesStr: String[][];
  regionsStr: String[][];  

  constructor(private countryService: CountryService, private regionService: RegionService, private formBuilder: FormBuilder, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.regionForm = this.formBuilder.group({
      ID:[''],
      country_ID: ['',Validators.required],
      name: ['',Validators.required],
      modified: ['']
    })
    this.getRegions();
    this.getCountries();
    //
    this.countriesStr = new String[this.countries[this.countries.length-1].ID + 1][6] ;
    
    for(var i = 1; i < this.countriesStr.length; i++) {
      this.countriesStr[i][0] = this.countries[i].name_de;
      this.countriesStr[i][1] = this.countries[i].name_es;
      this.countriesStr[i][2] = this.countries[i].name_en;
      this.countriesStr[i][3] = this.countries[i].name_fr;
      this.countriesStr[i][4] = this.countries[i].name_it;
      this.countriesStr[i][5] = this.countries[i].name_pt;
    }

    //
    this.regionsStr = new String[this.regions[this.regions.length-1].ID] ;

  }

  getRegions() {
    this.regions = [];
    this.regionService.getRegions().subscribe(
      (res : any) => {
        console.log(res.data);
        this.regions = res.data;
      },
      err => console.error(err)
    )
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

  getRegion(id) {
    this.region = null;
    this.regionService.getRegion(id).subscribe(
      (res: any) => {
        this.region = res.data;
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

  deleteRegion() {
    this.regionService.deleteRegion(this.region.ID).subscribe(
      res => {
        this.getRegions();
      },
      err => console.error(err)
    )
    this.modal.close();
  }

  createRegion() {
    //console.log(id);
    this.submitted = true;
    console.log(this.regionForm.value)
    if(this.regionForm.invalid) {
      console.log('Formulario Inválido');
      return;
    }
    this.regionService.createRegion(this.regionForm.value).subscribe(
      res => {
        this.getRegions()
      },
      err => console.error(err)
    )
    this.modal.close();
    this.submitted = false;
  }

  updateRegion(id) {
    this.submitted = true;
    if(this.regionForm.invalid) {
      console.log('Formulario Inválido');
      return;
    }
    this.regionService.updateRegion(this.regionForm.value, id).subscribe(
      res => {
        this.getRegions();
      },
      err => { 
        console.error(err);
      }
    )
    this.modal.close();
    this.submitted = false;
  }

  get f() { return this.regionForm.controls }

  openCreateModal(content) {
    this.regionForm.reset();
    this.getCountries();
    this.modal = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openEditModal(content, region) {
    this.regionForm.reset();
    this.getCountries();
    this.regionService.getRegion(region.ID).pipe(first()).subscribe(
      (res : any) => {
        this.region = res.data;
        this.regionForm.patchValue(res.data); 
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
    this.getRegion(id);
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
