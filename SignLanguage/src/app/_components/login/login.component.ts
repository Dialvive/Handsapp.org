import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public inputMail: string = '';

  constructor(
    public appComponent: AppComponent
  ) { }

  ngOnInit(): void {
  }

}
