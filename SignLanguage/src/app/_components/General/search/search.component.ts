import { AfterViewInit, Component } from '@angular/core';
import { AppComponent } from '../../../app.component';
import { HttpParams } from '@angular/common/http'
import { Router } from '@angular/router'
import { GoogleAnalyticsService } from '../../../_services/GoogleAnalytics/google-analytics.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements AfterViewInit {

  public schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'HandsApp',
    'foundingDate': '2020-11-01',
    'url': 'https://handsapp.org',
    'isAccessibleForFree': true,
    'isFamilyFriendly': true,
    'teaches': ['Zeichensprache', 'Lengua de señas', 'SignLanguage', 'Langage des signes', 'Linguaggio dei segni', 'Linguagem de sinais'],
    'learningResourceType': 'videos',
    'accessMode': 'visual',
    'inLanguage': ['de', 'es', 'en', 'fr', 'it', 'pt'],
    'image': 'https://handsapp.org/assets/img/logo.png',
    'sameAs': [
      'https://www.facebook.com/HandsApp.org',
      'https://twitter.com/HandsAppOrg',
      'https://www.instagram.com/handsapp_org/'
      ],
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.handsapp.org/search?txt={search_term_string}",
        "query-input": "required name=search_term_string"
      },
    'copyrightHolder': {
      '@type': 'Organization',
      'name': 'Tecnologías Haikode S.A.S. de C.V.'
    },
    'copyrightNotice': 'All rights reserved.',
    'copyrightYear': '2021',
    'creator': [{
      '@type': 'Person',
      'name': 'Diego A Villalpando Velazquez',
      'sameAs': ['https://www.linkedin.com/in/diegovillalpando/', 'https://github.com/Dialvive/']
      },
      {
        '@type': 'Person',
        'name': 'Marco A Blancas Tokunaga',
        'sameAs': ['https://www.linkedin.com/in/marco-tokunaga/', 'https://github.com/tokumago/']
      }],
    'keywords': ['zeichensprache', 'lengua de señas', 'Sign Language', 'langage des signes', 'linguaggio dei segni', 'linguagem de sinais',
                'LSM', 'learn', 'aprender', 'imparare', 'lernen', 'apprendre'],
  }

  public strWord: string[] = ["Suche nach Wörtern", "Buscar palabras", "Search words", "Rechercher des mots", "Cerca le Parole", "Procure palavras"];
  public strPhrase: string[] = ["Suchphrasen", "Buscar frases", "Search phrases", "Rechercher des phrases", "Frasi di ricerca", "Pesquisar frases"];
  public strSearch: string[] = ["Suche", "Buscar", "Search", "Chercher", "Ricerca", "Procurar"];
  public strVersion: string[] = ["Wir begrüßen Sie zur ersten Version von HandsApp.org und hoffen, dass es Ihnen gefällt! Wir freuen uns über Ihre ",
                                "Te damos la bienvenida a la primera versión de HandsApp.org ¡Esperamos que la disfrutes! Agradecemos tus ",
                                "We welcome you to the first version of HandsApp.org. We hope you enjoy it! We appreciate your ",
                                "Nous vous souhaitons la bienvenue dans la première version de HandsApp.org et espérons que vous l'apprécierez! Nous apprécions vos ",
                                "Ti diamo il benvenuto alla prima versione di HandsApp.org e speriamo che ti piaccia! Apprezziamo i tuoi ",
                                "Sejam bem-vindos à primeira versão do HandsApp.org. Esperamos que gostem! Agradecemos seus "]
  public strComments: string[] = ["Kommentare", "comentarios","feedback","commentaires", "commenti", "comentários" ]
  public strFrst: string[] = ['Das erste Mal hier? Versuchen Sie, nach "Tier" zu suchen, oder besuchen Sie ',
                            '¿Primera vez aquí? Prueba buscando "animal", o visita  ',
                            'First time here? Try searching for "animal", or visit  ',
                            `Première fois ici? Essayez de rechercher «animal» ou consultez  `,
                            `Prima volta qui? Prova a cercare "animale" o visita l' `,
                            'Primeira vez aqui? Experimente pesquisar por "animal" ou visite ']
  public strIndex: string[] = ["den thematischer Wortindex", "el índice temático de palabras", "the thematic index of words", "l'index thématique des mots", "l'indice tematico delle parole", "o índice temático de palavras"];

  public input : string = "";
  public params : HttpParams = this.appComponent.getParams();

  constructor(
    public appComponent: AppComponent, 
    private router : Router,
    public googleAnalyticsService: GoogleAnalyticsService) { }

    ngAfterViewInit(): void {
    var searchbox: any = document.getElementById("bg-search");
    searchbox.focus();
  }

  public submit(type : number) {
    if (this.input.trim() != "" && this.input != null){
      this.input = this.input.trim();
      this.googleAnalyticsService.eventEmitter(
        "search",
        "engagement",
        type == 0 ? "Search All" : type == 1 ? "Search Words" : "Search Phrases",
        this.input,
        this.appComponent.localeInt);
      //this.params.append('txt', this.input);
      this.router.navigate(["search"], {queryParams: {loc: this.appComponent.locale[0] + "_" + this.appComponent.locale[1] + "_" + this.appComponent.locale[2], typ: type , txt: this.input}});
    }
  }
}
