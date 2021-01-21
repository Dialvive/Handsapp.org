import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpokenLanguage } from '../../_models/spokenLanguage'

@Injectable({
  providedIn: 'root'
})

export class SpokenLanguageService {
  API_URI = 'http://localhost:8080';
  API_V = '/v1';
  constructor(private http: HttpClient) { }
  getSpokenLanguages(){
    return this.http.get(this.API_URI + this.API_V + '/spoken_languages ')
  }
  getSpokenLanguage(id:number){
    return this.http.get(this.API_URI + this.API_V + '/spoken_language/' + id)
  }
  createSpokenLanguage(spokenLanguage: SpokenLanguage){
    return this.http.post(this.API_URI + this.API_V + '/spoken_language', spokenLanguage)
  }
  updateSpokenLanguage(spokenLanguage: SpokenLanguage, id : number){
    return this.http.patch(this.API_URI + this.API_V + '/spoken_language/' + id, spokenLanguage)
  }
  deleteSpokenLanguage(id: number){
    return this.http.delete(this.API_URI + this.API_V + '/spoken_language/' + id)
  }
}
