import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-third-parties',
  templateUrl: './third-parties.component.html',
  styleUrls: ['./third-parties.component.css']
})
export class ThirdPartiesComponent implements OnInit {

  public strTitle: string[] = ["Lizenzen von Drittanbietern", "Licencias de terceros", "Third Party Licenses", "Licences tierces", "Licenze di terze parti", "Licenças de terceiros"];

  constructor(
    public appComponent: AppComponent,
   ) { }

  ngOnInit(): void {
  }

}
