import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public locale: string[] | any; // Locale is expected to have three values: [0]spokenLang [1]signLang [2]country
  public localeInt: number | any; // 0: de, 1: es, 2: en, 3: fr, 4: it, 5: pt

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
    ) { }

  //Gets locale through params, or infers it using navigator or IP address.
  // TODO: infer sign language.
  public getLocale(): void {
    var country: string | any;
    var loc = this.route.snapshot.queryParamMap.get('loc')
    if (loc == null) {
      if (navigator.language.includes('-')) { // navigator.language == 'es-MX'
        var locale: string[] = navigator.language.split('-')
        this.locale = [locale[0], '', locale[1]]
      } else {
        this.http.get("https://api.ipgeolocationapi.com/geolocate/").pipe(map((json: any): 
        Object => {
          return (json['alpha2'] as string)
        })).subscribe(
          response => {
            country = response;
          }, 
          err => console.error(err));
        this.locale = [navigator.language, '', country]
      }
    } else {
      this.locale = loc.split('_')
    }
    this.localeInt = this.getLocaleInt(this.locale[0])
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

  // navigate redirects faster through router
  public navigate(page: String): void {
    this.router.navigate([page]);
  }

  // navigate redirects faster through router with id & txt parameters.
  public navigateParams(page: String, locP: string[], idP: String, txtP: String): void {
    this.router.navigate([page], {queryParams: {loc: locP[0] + "_" + locP[1] + "_" + locP[2], id: idP, txt: txtP}});
  }
}
