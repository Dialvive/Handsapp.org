import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WordCategory } from '../../_models/wordCategory';

const URI: string = "https://api.handsapp.org/v1/"

@Injectable({
  providedIn: 'root'
})
export class WordCategoryService {
  public categories : WordCategory[] = [];
  constructor(private http: HttpClient) { }

  public getWordCategories(): Observable<WordCategory[]> {
    return this.http.get<WordCategory[]>(URI + "word_categories").pipe(map((json: any): WordCategory[] => {
      this.categories = (json['data'] as WordCategory[])
      return this.categories
    }))
  }

  public getWordCategory(id: number): Observable<WordCategory> {
    return this.http.get<WordCategory>(URI +"word_category/"+ id).pipe(map((json: any): WordCategory => {
      return (json['data'] as WordCategory)
    }))
  }
}
