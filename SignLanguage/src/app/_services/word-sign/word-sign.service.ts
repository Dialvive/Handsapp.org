import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WordSign } from '../_models/wordSign';

const URI: string = "https://api.handsapp.org/v1/word_signs/"

@Injectable({
  providedIn: 'root'
})
export class WordSignService {

  constructor(private http: HttpClient) { }

  public getWordSigns(id: number): Observable<WordSign[]> {
    return this.http.get<WordSign>(URI + id).pipe(map((json: any): WordSign[] => {
      return (json['data'] as WordSign[])
    }))
  }

}
