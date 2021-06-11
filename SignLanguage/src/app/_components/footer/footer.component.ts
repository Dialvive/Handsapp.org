import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
  public strCop: string[] = ["Alle Rechte vorbehalten, sofern nicht anders angegeben ", "Todos los derechos reservados, excepto donde se indique lo contrario", "All rights reserved, except where otherwise noted", "Tous droits réservés, sauf indication contraire  ", "Tutti i diritti riservati, salvo dove diversamente indicato ", "Todos os direitos reservados, salvo indicação em contrário"];
  public strReg: string[] = ["® Das HandsApp-Logo ist ein eingetragenes Warenzeichen von Tecnologías Haikode S.A.S. de C.V. in Mexiko", "® El logotipo de HandsApp es una marca registrada de Tecnologías Haikode S.A.S. de C.V. en México", "® The HandsApp logo is a registered trademark of Tecnologías Haikode S.A.S. de C.V. in Mexico", "® Le logo HandsApp est une marque déposée de Tecnologías Haikode S.A.S. de C.V. au Mexique", "® Il logo HandsApp è un marchio registrato di Tecnologías Haikode S.A.S. de C.V. in Messico", "® O logotipo da HandsApp é uma marca registrada da Tecnologías Haikode S.A.S. de C.V. no México"];

  public spLanguages: string[] = [" 🇩🇪 Deutsch ", " 🇪🇸 Español ", " 🇬🇧 English ", " 🇫🇷 Français ", " 🇮🇹 Italiano ", " 🇵🇹 Português " ];
  public sgLanguages: string[] = [" 🇺🇳 International Sign Language (ISL) ", " 🇲🇽 Lengua de Señas Mexicana (LSM) "]
  public spSelected: number | undefined;
  public sgSelected: number | undefined;
  private loc: string[] = [];

  constructor(
    public appComponent: AppComponent
  ) { }

  async ngOnInit() {
    this.appComponent.getLocale();
    this.spSelected = this.appComponent.localeInt;
    //TODO: Assign sg programatically
    this.sgSelected = 1;
  }

  public updateSP(value: any): void {
    this.appComponent.localeInt = this.spSelected;
    this.appComponent.updateLocaleInt(this.appComponent.localeInt);
  }

  public updateSG(value: any): void {
    this.appComponent.locale[1] = this.sgSelected;
  }

}
