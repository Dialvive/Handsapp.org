import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  txt: String;

  constructor(private router: Router) {
    this.txt = "";
  }
  
  ngOnInit(): void {
  }

    // navigate redirects faster through router
    public navigate(page: String): void {
      this.router.navigate([page]);
    }

}