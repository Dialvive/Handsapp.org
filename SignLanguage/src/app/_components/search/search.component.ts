import { Component, OnInit } from '@angular/core';
import { Word } from '../../_models/word'
import { WordService } from 'src/app/_services/word/word.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchText'
})

export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {

    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(it => {
      return it.toLocaleLowerCase().includes(searchText);
    });
  }
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  ngOnInit(): void {
  }
  

  words: Array<Word> = [];
  private wordService: WordService;

  constructor(wordService: WordService) {
    
  }

  getWords() {
    
    this.words = [];
    this.wordService.getWords().subscribe(
      (res : any) => {
        this.words = res.data;
      },
      err => console.error(err)
    )
  }
}
