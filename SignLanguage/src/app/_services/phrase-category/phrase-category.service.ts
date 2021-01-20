
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PhraseCategory } from '../../_models/phraseCategory'

@Injectable({
  providedIn: 'root'
})

export class PhraseCategoryService {
  API_URI = 'http://localhost:8080';
  API_V = '/v1'
  constructor(private http: HttpClient) { }
  getPhraseCategories(){
    return this.http.get(this.API_URI+this.API_V+'/phrase_categories')
  }
  getPhraseCategory(id:number){
    return this.http.get(this.API_URI+this.API_V+'/phrase_category/'+id)
  }
  createPhraseCategory(category: PhraseCategory){
    return this.http.post(this.API_URI+this.API_V+'/phrase_category',category)
  }
  updatePhraseCategory(category: PhraseCategory, id : number){
    return this.http.patch(this.API_URI+this.API_V+'/phrase_category/'+id,category)
  }
  deleteCategory(id: number){
    return this.http.delete(this.API_URI+this.API_V+'/phrase_category/'+id)
  }
}
