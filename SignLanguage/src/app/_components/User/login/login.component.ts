import { Component, Input } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @Input()
  public inputMail: string = '';
  @Input()
  public inputPassword: string = '';

  constructor(
    public appComponent: AppComponent
  ) { }

  public login() {
    console.log("Login attempted " + this.inputMail + ' ' + this.inputPassword);

  }

}
