import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { map, retryWhen } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  public strIdi: string[] = ["Sprache", "Idioma", "Language", "Langage", "Linguaggio", "Língua"];
  public strLen: string[] = ["Zeichensprache", "Lengua de Señas", "Sign Language", "Langage des Signes","Linguaggio dei Segni", "Linguagem de Sinais"];
  public strSob: string[] = ["Über Uns", "Sobre Nosotros", "About Us", "À Propos de Nous", "Chi Siamo", "Sobre Nós"];
  public strPro: string[] = ["Produkte", "Productos", "Products", "Produits", "Prodotti", "Produtos"];
  public strRed: string[] = ["Sozialen Medien", "Redes Sociales", "Social Media", "Réseaux Sociaux", "Social Media", "Redes Sociais"];
  public strLeg: string[] = ["Legal", "Legales", "Legal", "Légal", "Legale", "Jurídico"];
  public strMis: string[] = ["Mission", "Misión", "Mission", "Mission", "Missione", "Missão"];
  public strEqu: string[] = ["Mannschaft", "Equipo", "Team", "Équipe", "Squadra", "Equipe"];
  public strCon: string[] = ["Kontakt", "Contáctanos", "Contact", "Contacter", "Contatto", "Contato"];
  public strTer: string[] = ["Geschäftsbedingungen", "Términos y condiciones", "Terms and conditions", "Termes et conditions", "Termini e condizioni", "Termos e condições"];
  public strPri: string[] = ["Datenschutzbestimmungen", "Política de privacidad", "Privacy policy", "Politique de confidentialité ", "Politica sulla piservatezza ", "Política de privacidade"];
  public strCop: string[] = ["Alle rechte vorbehalten", "Todos los derechos reservados", "All rights reserved", "Tous droits réservés ", "Tutti i diritti riservati", "Todos os direitos reservados"];

  public spLanguages: string[] = [" 🇩🇪 Deutsch ", " 🇪🇸 Español ", " 🇬🇧 English ", " 🇫🇷 Français ", " 🇮🇹 Italiano ", " 🇵🇹 Português " ];
  public sgLanguages: string[] = [" 🇺🇳 International Sign Language (ISL) ", " 🇲🇽 Lengua de Señas Mexicana (LSM) "]
  public spSelected: number | undefined; //TODO: Assign after getlocale()
  public sgSelected: number | undefined; //TODO: Infer after getlocale()

  constructor(
    public appComponent: AppComponent,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }

  async ngOnInit() {
    this.appComponent.localeInt = 1; //TODO: SHould be asigned programatically
    this.sgSelected = 1;
    await this.getLocale();
  }

  //Gets locale through params, or infers it using navigator or IP address.
  // TODO: infer sign language.
  public async getLocale() {
    var country: string | any;
    var loc: any;
    await this.route.queryParams.subscribe(params => {
      loc = params['loc'];
      console.log(loc)
    })
    if (loc == null) {
      console.log("NULL")
      if (navigator.language.includes('-')) { // navigator.language == 'es-MX'
        var locale: string[] = navigator.language.split('-')
        this.appComponent.locale = [locale[0], '', locale[1]]
      } else {
        await this.http.get("https://api.ipgeolocationapi.com/geolocate/").pipe(map((json: any): 
        Object => {
          return (json['alpha2'] as string)
        })).subscribe(
          response => {
            country = response;
          }, 
          err => console.error(err));
        this.appComponent.locale = [navigator.language, '', country]
      }
    } else {
      this.appComponent.locale = loc.split('_')
    }
    this.spSelected = this.getLocaleInt(this.appComponent.locale[0])
  }

  //Sets the LocaleInt globally depending on a given alpha2 country code.
  private getLocaleInt(str: string): number {
    switch (str) {
      case 'de':
        return 0;
      case 'es':
        return 1;
      case 'en':
        return 2;
      case 'fr':
        return 3;
      case 'it':
        return 4;
      case 'pt':
        return 5;
      default:
        return 2;
    }
  }

  public updateSP(value: any): void {
    this.appComponent.localeInt = this.spSelected;
  }

  public updateSG(value: any): void {
    this.appComponent.locale[1] = this.sgSelected;
  }

}
