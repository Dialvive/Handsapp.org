import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {

  public strTitle: string[] = 
  ["Allgemeine Geschäftsbedingungen für alle Anwendungen anwendbar, Produkte und Dienstleistungen im Zusammenhang mit dem HandsApp Platform",
  "Términos y Condiciones aplicables a todas las Aplicaciones, Productos y Servicios Referentes a la Plataforma HandsApp",
  "Terms and Conditions applicable to all Applications, Products and Services Relating to the HandsApp Platform",
  "Termes et conditions applicables à toutes les applications, les produits et services liés à la plate-forme HandsApp",
  "Termini e condizioni applicabili a tutte le applicazioni, prodotti e servizi relativi alla piattaforma HandsApp ",
  "Termos e Condições aplicáveis a todos os aplicativos, produtos e serviços relacionados à plataforma HandsApp"];
  
  public strAlert: string[] =
  ["Im Moment haben wir dieses Dokument nur auf Spanisch.",
  "",
  "At the moment, we only have this document in Spanish.",
  "Pour le moment, nous n'avons que ce document en espagnol.",
  "Al momento, abbiamo solo questo documento in spagnolo.",
  "No momento, temos este documento apenas em espanhol."];

  constructor(
    public appComponent: AppComponent,
  ) { }

  ngOnInit(): void {
  }

}
