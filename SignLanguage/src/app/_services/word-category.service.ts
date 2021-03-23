import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WordCategory } from '../_models/wordCategory';

const URI: string = "https://api.handsapp.org/v1/word_categories/"

@Injectable({
  providedIn: 'root'
})
export class WordCategoryService {

  constructor(private http: HttpClient) { }

  public getWordCategories(): Observable<WordCategory[]> {
    return this.http.get<WordCategory[]>(URI).pipe(map((json: any): WordCategory[] => {
      return (json['data'] as WordCategory[])
    }))
  }
}
