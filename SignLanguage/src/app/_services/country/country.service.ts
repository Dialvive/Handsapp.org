import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../../_models/country'

@Injectable({
  providedIn: 'root'
})

export class CountryService {
  API_URI = 'http://localhost:8080';
  API_V = '/v1';
  constructor(private http: HttpClient) { }
  getCountries(){
    return this.http.get(this.API_URI+ this.API_V +'/countries')
  }
  getCountry(id:number){
    return this.http.get(this.API_URI+this.API_V +'/country/'+id)
  }
  createCountry(country: Country){
    return this.http.post(this.API_URI+this.API_V +'/country',country)
  }
  updateCountry(country: Country, id : number){
    return this.http.patch(this.API_URI+this.API_V +'/country/'+ id,country)
  }
  deleteCountry(id: number){
    return this.http.delete(this.API_URI+this.API_V +'/country/'+id)
  }
}
