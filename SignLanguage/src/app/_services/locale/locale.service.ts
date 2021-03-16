import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Locale } from '../../_models/locale'

@Injectable({
  providedIn: 'root'
})

export class LocaleService {
  API_URI = 'http://localhost:8080';
  API_V = '/v1';
  constructor(private http: HttpClient) { }
  getLocales(){
    return this.http.get(this.API_URI + this.API_V + '/locales')
  }
  getLocale(id:number){
    return this.http.get(this.API_URI + this.API_V + '/locale/' + id)
  }
  createLocale(locale: Locale){
    return this.http.post(this.API_URI + this.API_V + '/locale',locale)
  }
  updateLocale(locale: Locale, id : number){
    return this.http.patch(this.API_URI + this.API_V + '/locale/' +  id,locale)
  }
  deleteLocale(id: number){
    return this.http.delete(this.API_URI + this.API_V + '/locale/' + id)
  }
}