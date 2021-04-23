import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { HttpParams, HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public strWord: string[] = ["Suche nach Wörtern", "Buscar palabras", "Search words", "Rechercher des mots", "Cerca le Parole", "Procure palavras"];
  public strPhrase: string[] = ["Suchphrasen", "Buscar frases", "Search phrases", "Rechercher des phrases", "Frasi di ricerca", "Pesquisar frases"];
  public strSearch: string[] = ["Suche", "Buscar", "Search", "Chercher", "Ricerca", "Procurar"];
  public input : string = "";
  public params : HttpParams = this.appComponent.getParams();

  constructor(public appComponent: AppComponent, private router : Router) { }

  ngOnInit(): void {}

  public submit(type : number) {
    if (this.input.trim() != "" && this.input != null){
      //this.params.append('txt', this.input);
      this.router.navigate(["search"], {queryParams: {loc: this.appComponent.locale[0] + "_" + this.appComponent.locale[1] + "_" + this.appComponent.locale[2], typ: type , txt: this.input.trim()}});
    }
  }
}
