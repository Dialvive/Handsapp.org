import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Phrase } from '../../_models/phrase'

@Injectable({
  providedIn: 'root'
})

export class PhraseService {
  API_URI = 'http://localhost:8080';
  API_V = '/v1';
  constructor(private http: HttpClient) { }
  getPhrases(){
    return this.http.get(this.API_URI+ this.API_V +'/phrases')
  }
  getPhrase(id:number){
    return this.http.get(this.API_URI+this.API_V +'/phrase/'+id)
  }
  createPhrase(phrase: Phrase){
    return this.http.post(this.API_URI+this.API_V +'/phrase',phrase)
  }
  updatePhrase(phrase: Phrase, id : number){
    return this.http.patch(this.API_URI+this.API_V +'/phrase/'+ id,phrase)
  }
  deletePhrase(id: number){
    return this.http.delete(this.API_URI+this.API_V +'/phrase/'+id)
  }
}
