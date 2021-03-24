import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignLanguage } from '../../_models/signLanguage'

@Injectable({
  providedIn: 'root'
})

export class SignLanguageService {
  API_URI = 'http://localhost:8080';
  API_V = '/v1';
  constructor(private http: HttpClient) { }
  getSignLanguages(){
    return this.http.get(this.API_URI + this.API_V + '/sign_languages ')
  }
  getSignLanguage(id:number){
    return this.http.get(this.API_URI + this.API_V + '/sign_language/' + id)
  }
  createSignLanguage(signLanguage: SignLanguage){
    return this.http.post(this.API_URI + this.API_V + '/sign_language', signLanguage)
  }
  updateSignLanguage(signLanguage: SignLanguage, id : number){
    return this.http.patch(this.API_URI + this.API_V + '/sign_language/' + id, signLanguage)
  }
  deleteSignLanguage(id: number){
    return this.http.delete(this.API_URI + this.API_V + '/sign_language/' + id)
  }
}
