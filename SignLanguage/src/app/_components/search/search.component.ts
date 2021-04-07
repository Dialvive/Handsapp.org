import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public strWord: string[] = ["Suche nach Wörtern", "Buscar palabras", "Search words", "Rechercher des mots", "Cerca le Parole", "Procure palavras"];
  public strPhrase: string[] = ["Suchphrasen", "Buscar frases", "Search phrases", "Rechercher des phrases", "Frasi di ricerca", "Pesquisar frases"];
  public strSearch: string[] = ["Suche", "Buscar", "Search", "Chercher", "Ricerca", "Procurar"];
  constructor(public appComponent: AppComponent) { }

  ngOnInit(): void {
  }

}
