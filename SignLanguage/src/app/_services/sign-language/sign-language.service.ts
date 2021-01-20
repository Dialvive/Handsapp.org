import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignLanguage } from '../../_models/signLanguage'

@Injectable({
  providedIn: 'root'
})

export class signLanguageService {
  API_URI = 'http://localhost:8080';
  
  constructor(private http: HttpClient) { }
  getSignLanguages(){
    return this.http.get(this.API_URI+'/signLanguages')
  }
  getSignLanguage(id:number){
    return this.http.get(this.API_URI+'/signLanguage/'+id)
  }
  createSignLanguage(signLanguage: SignLanguage){
    return this.http.post(this.API_URI+'/signLanguage',signLanguage)
  }
  updateSignLanguage(signLanguage: SignLanguage){
    return this.http.patch(this.API_URI+'/signLanguage/'+signLanguage.ID,signLanguage)
  }
  deleteSignLanguage(id: number){
    return this.http.delete(this.API_URI+'/signLanguage/'+id)
  }
}
