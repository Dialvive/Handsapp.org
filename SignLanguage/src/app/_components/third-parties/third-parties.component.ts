import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-third-parties',
  templateUrl: './third-parties.component.html',
  styleUrls: ['./third-parties.component.css']
})
export class ThirdPartiesComponent implements OnInit {

  constructor(public appComponent: AppComponent) { }

  ngOnInit(): void {
  }

}
