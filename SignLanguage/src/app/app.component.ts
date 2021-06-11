import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { Meta } from '@angular/platform-browser';


declare let gtag: (property: string, value: any, configs: any) => {};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public description: string[] = [
    "Lernen Sie Gebärdensprachen aus der ganzen Welt auf Deutsch 🇩🇪, Englisch, Spanisch, Portugiesisch, Französisch und Italienisch. Kostenlos lernen mit dem HandsApp Wörterbuch!",
    "Aprende lenguas de señas de todo el mundo en español 🇪🇸, inglés, portugués, francés, alemán, e italiano. ¡Aprende de forma gratuita con el diccionario HandsApp!",
    "Learn sign languages from around the world in English 🇬🇧 🇺🇸, Spanish, French, Portuguese, German, and Italian. Learn for free with the HandsApp dictionary!",
    "Apprenez les langues des signes du monde entier en français 🇫🇷, anglais, espagnol, portugais, allemand et italien. Apprenez gratuitement avec le dictionnaire HandsApp!",
    "Impara le lingue dei segni di tutto il mondo in italiano 🇮🇹, francese, spagnolo, inglese, portoghese e tedesco. Impara gratuitamente con il dizionario HandsApp!",
    "Aprenda línguas de sinais de todo o mundo em português 🇵🇹 🇧🇷, espanhol, inglês, francês, alemão e italiano. Aprenda gratuitamente com o dicionário HandsApp!"
  ];

  public locale: string[] | any; // Locale is expected to have three values: [0]spokenLang [1]signLang [2]country
  public localeInt: number | any; // 0: de, 1: es, 2: en, 3: fr, 4: it, 5: pt
  public localeTxt: string | any;
  public page: string = '';
  public params: HttpParams = this.getParams();

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    public Location:Location,
    private meta: Meta
    ) {
      this.router.events.subscribe(
        event => {
          if(event instanceof NavigationEnd){
            gtag('config', 'G-DMRJ6K1JHB', { 'page_path': event.urlAfterRedirects });
          }
        });
      }
    

  //Gets locale through params, or infers it using navigator or IP address.
  // TODO: infer sign language.
  public async getLocale(): Promise<boolean> {
    var country: string | any;
    var locStr: string | null = this.params.get("loc");
    if (locStr == null || locStr == '' ) { // There's no loc in URL
      console.log("Inferring Locale...");
      if (navigator.language.includes('-')) { // navigator.language ~ 'es-MX'
        var locale: string[] = navigator.language.split('-')
        this.locale = [locale[0].substring(0,2), '', locale[1].substring(0,2)]
      } else { // navigator.language ~ 'es'
        country = await this.http.get("https://api.ipgeolocationapi.com/geolocate/")
        .pipe(map((json: any): 
          Object => {
            return (json['alpha2'] as string)
          })).toPromise();
        this.locale = [navigator.language, '', country];
      }
    } else { // There's loc in URL
      this.locale = locStr.split('_');
      this.locale = [this.locale[0].substring(0,2), this.locale[1].substring(0,3), this.locale[2].substring(0,2)];
    }
    this.localeInt = this.getLocaleInt(this.locale[0]);
    this.localeTxt = this.locale[0] + "_" + this.locale[1] + "_" + this.locale[2];
    this.verifyLocale();
    this.updateRoute();
    document.documentElement.lang = this.locale[0];
    return true
  }

  //getParams Gets the parameters from the current URL
  public getParams(): HttpParams {
    var route = this.Location.path();
    this.page = route.substring(0,route.indexOf('?'));
    route = route.substring(route.indexOf('?')+1,route.length);
    return new HttpParams({ fromString: route });
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
        this.locale[0] = "en";
        this.localeTxt = this.locale[0] + "_" + this.locale[1] + "_" + this.locale[2];
        return 2;
    }
  }

  //verifyLocale() checks if the locale so far is within acceptable values, if not, assigns one
  private verifyLocale(): void {
    if (this.locale[0] != "de" &&
        this.locale[0] != "es" &&
        this.locale[0] != "en" &&
        this.locale[0] != "fr" &&
        this.locale[0] != "it" &&
        this.locale[0] != "pt") {
          this.locale[0] = "en"
          this.localeInt = 2;
    }
    //TODO: assign sg programatically
    if (this.locale[1] != "LSM") {
      this.locale[1] = "LSM"
    }
    this.localeTxt = this.locale[0] + "_" + this.locale[1] + "_" + this.locale[2];
  }

  //updateRoute() updates the URL to explicitly tell the locale
  private updateRoute(): void {
    var routeStr: string = '?';
    routeStr += "loc=" + this.locale[0]+'_'+this.locale[1]+'_'+this.locale[2];
    if (this.params.has("id")){
      routeStr += "&id=" + this.params.get("id");
    }
    if (this.params.has("txt")){
      routeStr += "&txt=" + this.params.get("txt");
    }
    this.Location.replaceState(this.page + routeStr);
    this.setMeta();
  }
  
  //updateLocaleInt() updates LocaleInt value
  public updateLocaleInt(id: number): void { 
    this.localeInt = id;
    this.locale = new Array(new Array("de","es","en","fr","it","pt")[id], this.locale[1], this.locale[2]);
    this.localeTxt = this.locale[0] + "_" + this.locale[1] + "_" + this.locale[2];
    console.log("appComponent.updateLocaleInt(): " + this.locale[0])
    this.updateRoute();
  }

  // navigate redirects faster through router with id & txt parameters.
  public navigateParams(page: String, locP: string[], idP: String, txtP: String): void {
    this.router.navigate([page], {queryParams: {loc: locP[0] + "_" + locP[1] + "_" + locP[2], id: idP, txt: txtP}});
  }

  //setMeta assigns meta tags according to the localeInt
  private setMeta(): void {
    if(this.meta.getTag("name='description'") != null){
      this.meta.updateTag({name: 'description', content: this.description[this.localeInt]}, "name='description'");
      console.log("update description")
    } else { 
      console.log("add description")
      this.meta.addTag({name: 'description', content: this.description[this.localeInt]});
    }
    if(this.meta.getTag("property='og:description'") != null){
      this.meta.updateTag({property: 'og:description', content: this.description[this.localeInt]}, "property='og:description'");
      console.log("Update og:description")
    } else {
      console.log("add og:description")
      this.meta.addTag({property: 'og:description', content: this.description[this.localeInt]});
    }
    if(this.meta.getTag("property='og:locale'") != null){
      this.meta.updateTag({property: 'og:locale', content: this.locale[0] + "_" + this.locale[2]}, "property='og:locale'");
    } else {
      this.meta.addTag({property: 'og:locale', content: this.locale[0] + "_" + this.locale[2]});
    }
    if(this.meta.getTag("property='og:url'") != null){
      this.meta.updateTag({property: 'og:url', content:"https://HandsApp.org" + this.Location.path()}, "property='og:url'");
    } else {
      this.meta.addTag({property: 'og:url', content:"https://HandsApp.org" + this.Location.path()});
    }
  }

  //Sanitizes URIs in templates
  public encodeURIComponent(URI: string): string {
    return encodeURIComponent(URI);
  }

}
