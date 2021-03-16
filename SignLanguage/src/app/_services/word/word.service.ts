import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Word } from '../../_models/word'

@Injectable({
  providedIn: 'root'
})

export class WordService {
  API_URI = 'http://localhost:8080';
  API_V = '/v1';
  constructor(private http: HttpClient) { }
  getWords(){
    return this.http.get(this.API_URI+ this.API_V +'/words')
  }
  getWord(id:number){
    return this.http.get(this.API_URI+this.API_V +'/word/'+id)
  }
  createWord(word: Word){
    return this.http.post(this.API_URI+this.API_V +'/word',word)
  }
  updateWord(word: Word, id : number){
    return this.http.patch(this.API_URI+this.API_V +'/word/'+ id,word)
  }
  deleteWord(id: number){
    return this.http.delete(this.API_URI+this.API_V +'/word/'+id)
  }
}