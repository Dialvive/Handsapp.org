import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpokenLanguage } from '../../_models/spokenLanguage'

@Injectable({
  providedIn: 'root'
})

export class SpokenLanguageService {
  API_URI = 'http://localhost:8080';
  
  constructor(private http: HttpClient) { }
  getSpokenLanguages(){
    return this.http.get(this.API_URI+'/spokenLanguages')
  }
  getSpokenLanguage(id:number){
    return this.http.get(this.API_URI+'/spokenLanguage/'+id)
  }
  createSpokenLanguage(spokenLanguage: SpokenLanguage){
    return this.http.post(this.API_URI+'/spokenLanguage',spokenLanguage)
  }
  updateSpokenLanguage(spokenLanguage: SpokenLanguage){
    return this.http.patch(this.API_URI+'/spokenLanguage/'+spokenLanguage.ID,spokenLanguage)
  }
  deleteSpokenLanguage(id: number){
    return this.http.delete(this.API_URI+'/spokenLanguage/'+id)
  }
}
