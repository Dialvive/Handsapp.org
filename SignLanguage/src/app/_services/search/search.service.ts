import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Search, WordSearchResult } from '../../_models/search';

const URI: string = "https://api.handsapp.org/v1/search/"

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private http: HttpClient
    ) { }

  public searchWords(q: string, limit: number): Observable<WordSearchResult> {
    const search: Search = new Search(q, limit);
    return this.http.post<WordSearchResult>(URI+"words", search)
  }
}
