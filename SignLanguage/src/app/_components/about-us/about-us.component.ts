import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  public strTitle: string[] = ["Über Uns", "Sobre Nosotros", "About Us", "À Propos de Nous", "Chi Siamo", "Sobre Nós"];

  constructor(public appComponent: AppComponent) { }

  async ngOnInit() { }

}
