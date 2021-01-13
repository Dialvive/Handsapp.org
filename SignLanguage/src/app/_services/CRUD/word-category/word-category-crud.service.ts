
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WordCategory } from '../../../_models/wordCategory'

@Injectable({
  providedIn: 'root'
})

export class WordCategoryService {
  API_URI = 'http://localhost:8080';
  
  constructor(private http: HttpClient) { }
  getCategories(){
    return this.http.get(this.API_URI+'/wordcategory')
  }
  getWordCategory(id:number){
    return this.http.get(this.API_URI+'/wordcategory/'+id)
  }
  createWordCategory(category: WordCategory){
    return this.http.post(this.API_URI+'/wordcategory',category)
  }
  updateWordCategory(category: WordCategory){
    return this.http.put(this.API_URI+'/wordcategory/'+category.id,category)
  }
  deleteCategory(id: number){
    return this.http.delete(this.API_URI+'/wordcategory/'+id)
  }
}
