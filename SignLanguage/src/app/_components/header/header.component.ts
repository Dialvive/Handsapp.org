import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public strWord: string[] = ["Wörter", "Palabras", "Words", "Mots", "Parole", "Palavras"];
  public strPhrase: string[] = ["Sätze", "Frases", "Phrases", "Phrases", "Frasi", "Frases"];
  public strTool: string[] = ["Werkzeuge", "Herramientas", "Tools", "Outils", "Utensili", "Ferramentas"];
  public strAccount: string[] = ["Rechnung", "Cuenta", "Account", "Account", "Compte", "Conta"];
  public strEmail : string[] = ["Email", "Correo Elecrónico", "Email", "E-mail","E-mail", "O email"];
  public strPsw: string[] = ["Passwort", "Contraseña", "Password", "Mot de passe", "Palora d'ordine", "Senha" ];
  public strComSoon : string[] = ["kommt bald","Próximamente", "Coming soon", "Bientôt disponible", "Prossimamente", "Em breve"];
  public strLogIn : string[] = ["Einloggen", "Inicia Sesión", "Log in", "Commencer la session", "Accesso", "Iniciar sessão" ];
  public strRemDat : string[] = ["Erinnere dich an meine Daten", "Recuerda mis datos", "Remember my data", "Souviens-toi de mes données", "Ricorda i miei dati", "Lembre-se de meus dados "];
  public strFistTime : string[] = ["Erstes Mal? Anmelden", "¿Primera vez? Registrate", "First time?", "Première fois?  S'inscrire", "Primera volta? Iscriviti", "Primeira vez? Catasto-se "];
  public strForgotPsw : string[] = ["Ich habe mein Passwort vergessen", "Olvidé mi contraseña", "I forgot my password", "J'ai oublié mon mot de passe", "Ho dimenticato la mia password", "Esqueci minha senha" ];
  public input : string = "";
  txt: String;

  constructor(private router: Router, public appComponent: AppComponent) {
    this.txt = "";
  }
  
  ngOnInit(): void {
  }

  // navigate redirects faster through router
  public navigate(page: String): void {
    this.router.navigate([page]);
  }
  
  public submit(type : number) {
    
    if (this.input.trim() != "" && this.input != null){
      //this.params.append('txt', this.input);
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>(
      this.router.navigate(["search"], {queryParams: {loc: this.appComponent.locale[0] + "_" + this.appComponent.locale[1] + "_" + this.appComponent.locale[2], typ: type , txt: this.input.trim()}})));
    }
  }

}