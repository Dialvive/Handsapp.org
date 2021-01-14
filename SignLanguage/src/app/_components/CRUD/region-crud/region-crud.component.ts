import { Component, OnInit } from '@angular/core';
import { Region } from './../../../_models/region';
import { RegionService } from './../../../_services/region/region.service'
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
declare var $: any;

@Component({
  selector: 'app-region-crud',
  templateUrl: './region-crud.component.html',
  styleUrls: ['./region-crud.component.css']
})
export class RegionCrudComponent implements OnInit {

  regions: Region[] | any;
  region: Region | any;
  regionForm: FormGroup;
  submitted: false;

  constructor(private regionService: RegionService) { }

  ngOnInit(): void {

  }

}
