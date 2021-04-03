import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { Location } from '@angular/common';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(
    public appComponent: AppComponent,
  ) { }

  ngOnInit(): void {
  }

}
