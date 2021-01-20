import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../../_models/country'

@Injectable({
  providedIn: 'root'
})

export class CountryService {
  API_URI = 'http://localhost:8080';
  
  constructor(private http: HttpClient) { }
  getCoutries(){
    return this.http.get(this.API_URI+'/countries')
  }
  getCountry(id:number){
    return this.http.get(this.API_URI+'/country/'+id)
  }
  createCountry(country: Country){
    return this.http.post(this.API_URI+'/country',country)
  }
  updateCountry(country: Country){
    return this.http.patch(this.API_URI+'/country/'+country.ID,country)
  }
  deleteCountry(id: number){
    return this.http.delete(this.API_URI+'/country/'+id)
  }
}
