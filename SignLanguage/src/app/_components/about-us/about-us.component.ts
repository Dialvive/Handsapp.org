import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  public schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'HandsApp',
    'alternateName': 'Hands App',
    'foundingDate': '2020-11-01',
    'url': 'https://handsapp.org',
    'logo': 'https://handsapp.org/assets/img/logo.png',
    'sameAs': [
      'https://www.facebook.com/HandsApp.org',
      'https://twitter.com/HandsAppOrg',
      'https://www.instagram.com/handsapp_org/'
      ],
    'email': 'hola@handsapp.org'
  }

  public strTitle: string[] = ["Über Uns", "Sobre Nosotros", "About Us", "À Propos de Nous", "Chi Siamo", "Sobre Nós"];

  constructor(public appComponent: AppComponent) { }

  async ngOnInit() { }

}
