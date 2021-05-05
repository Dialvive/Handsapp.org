import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {

  public strTitle: string[] = ["Geschäftsbedingungen", "Términos y condiciones", "Terms and conditions", "Termes et conditions", "Termini e condizioni", "Termos e condições"];

  constructor(
    public appComponent: AppComponent,
  ) { }

  ngOnInit(): void {
  }

}
