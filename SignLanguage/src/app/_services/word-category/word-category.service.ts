import { Injectable } from '@angular/core';
import { WordCategory } from '../../_models/wordCategory'
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';

/* const httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin': '*',
    'Authorization':'authkey',
    'userid':'1'
  })
}; */

@Injectable({
  providedIn: 'root'
})

export class WordCategoryService {
  API_URI = 'http://localhost:8080';
  API_V = '/v1/'
  
  constructor(private http: HttpClient) { }

  getWordCategories() {
    return this.http.get(this.API_URI + '/v1/word_categories')
  }

  getWordCategory(id:number) {
    return this.http.get(this.API_URI+'/v1/word_category/'+id)
  }
  createWordCategory(category: WordCategory) {
    return this.http.post(this.API_URI+'/v1/word_category',category)
  }
  updateWordCategory(category: WordCategory) {
    return this.http.put(this.API_URI+'/v1/word_category/'+category.id,category)
  }
  deleteCategory(id: number) {
    return this.http.delete(this.API_URI+'/v1/word_category/'+id)
  }
}