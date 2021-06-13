import { Component } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.css']
})
export class DonationsComponent {

  public strTitle: string[] = [ "Spenden", "Donaciones", "Donations", "Des Dons", "Donazioni ", "Doações"];

  constructor(
    public appComponent: AppComponent,
  ) { }

}
