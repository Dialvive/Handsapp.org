import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.css']
})
export class WordsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // navigate redirects faster through router
  public navigate(page: String): void {
    this.router.navigate([page]);
  }

  // navigate redirects faster through router with id & txt parameters
  public navigateIdTxt(page: String, idP: String, txtP: String): void {
    this.router.navigate([page], {queryParams: {id: idP, txt: txtP}});
  }
  

}
