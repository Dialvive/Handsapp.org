import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public locale: string[] | any; // Locale is expected to have three values: [0]spokenLang [1]signLang [2]country
  public localeInt: number | any; // 0: de, 1: es, 2: en, 3: fr, 4: it, 5: pt
  public params: HttpParams = this.getParams();


  constructor(
    public route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private Location:Location
    ) { }

  //Gets locale through params, or infers it using navigator or IP address.
  // TODO: infer sign language.
  public async getLocale() {
    var country: string | any;
    var locStr: string | null = this.params.get("loc");
    if (locStr == null || locStr == '' ) { // There's no loc in URL
      console.log("Inferring Locale...");
      if (navigator.language.includes('-')) { // navigator.language ~ 'es-MX'
        var locale: string[] = navigator.language.split('-')
        this.locale = [locale[0], '', locale[1]]
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
    }
    this.localeInt = this.getLocaleInt(this.locale[0]);
    this.verifyLocale();
    this.updateRoute();
    console.log("getLocale():" + this.locale);
  }

  //getParams Gets the parameters from the current URL
  public getParams(): HttpParams { 
    var route = this.Location.path();
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
        return 2;
    }
  }

  //Sets the LocaleInt globally depending on a given alpha2 country code.
  private getLocaleStr(id: number): string {
    switch (id) {
      case 0:
        console.log("switch: "+id);
        return "de";
      case 1:
        console.log("switch: "+id);
        return "es";
      case 2:
        console.log("switch: "+id);
        return "en";
      case 3:
        console.log("switch: "+id);
        return "fr";
      case 4:
        console.log("switch: "+id);
        return "it";
      case 5:
        console.log("switch: "+id);
        return "pt";
      default:
        console.log("switch: "+id);
        return "en";
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
  }

  //updateRoute() updates the URL to explicitly tell the locale
  private updateRoute(): void {
    if (this.params.get("loc") != this.locale[0]+'_'+this.locale[1]+'_'+this.locale[2]) {
      var routeStr: string = '?';
      if (!this.params.has("loc")) { 
        routeStr += "loc=" + this.locale[0]+'_'+this.locale[1]+'_'+this.locale[2];
        if (this.params.keys().length > 1) routeStr += '&';
        for (let i = 0; i < this.params.keys().length; i++) {
          routeStr += this.params.keys()[i] + '=' + this.params.get(this.params.keys()[i]);
          if (i+1 < this.params.keys().length) {
            routeStr += '&';
          }
        }
      } else {
        routeStr += "loc=" + this.locale[0]+'_'+this.locale[1]+'_'+this.locale[2];
        for (let i = 0; i < this.params.keys().length; i++) {
          if (this.params.keys()[i] == "loc") continue;
          routeStr += this.params.keys()[i] + '=' + this.params.get(this.params.keys()[i]);
          if (i+1 < this.params.keys().length) {
            routeStr += '&';
          }
        }
      }
      this.Location.replaceState(routeStr);
    }
  }

  //updateLocaleInt() updates LocaleInt value and the URL
  public updateLocaleInt(id: number): void { 
    this.localeInt = id;
    this.locale = new Array(this.getLocaleStr(id), this.locale[1], this.locale[2]);
    console.log(this.locale[0])
    this.updateRoute();
  }

  // navigate redirects faster through router
  public navigate(page: String): void {
    this.router.navigate([page]);
  }

  // navigate redirects faster through router with id & txt parameters.
  public navigateParams(page: String, locP: string[], idP: String, txtP: String): void {
    this.router.navigate([page], {queryParams: {loc: locP[0] + "_" + locP[1] + "_" + locP[2], id: idP, txt: txtP}});
  }
}
