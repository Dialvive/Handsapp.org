import { Component, Input } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  @Input()
  public inputMail: string = '';

  constructor(
    public appComponent: AppComponent,
  ) { }

  public register() {

  }

}
