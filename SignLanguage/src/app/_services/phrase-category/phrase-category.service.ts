
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PhraseCategory } from '../../_models/phraseCategory'

@Injectable({
  providedIn: 'root'
})

export class PhraseCategoryService {
  API_URI = 'http://localhost:8080';
  
  constructor(private http: HttpClient) { }
  getPhraseCategories(){
    return this.http.get(this.API_URI+'/PhraseCategory')
  }
  getPhraseCategory(id:number){
    return this.http.get(this.API_URI+'/PhraseCategory/'+id)
  }
  createPhraseCategory(category: PhraseCategory){
    return this.http.post(this.API_URI+'/PhraseCategory',category)
  }
  updatePhraseCategory(category: PhraseCategory){
    return this.http.patch(this.API_URI+'/PhraseCategory/'+category.ID,category)
  }
  deleteCategory(id: number){
    return this.http.delete(this.API_URI+'/PhraseCategory/'+id)
  }
}
