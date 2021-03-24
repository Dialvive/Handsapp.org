import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Word } from '../_models/word';

const URI: string = "https://api.handsapp.org/v1/word/"

@Injectable({
  providedIn: 'root'
})
export class WordService {

  constructor(private http: HttpClient) { }

  public getWord(id: number): Observable<Word> {
    return this.http.get<Word>(URI + id).pipe(map((json: any): Word => {
      return (json['data'] as Word)
    }))
  }

}
