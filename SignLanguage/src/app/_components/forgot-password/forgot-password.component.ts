import { Component, Input } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  @Input()
  public inputMail: string = '';

  constructor(
    public appComponent: AppComponent,
  ) { }

  public request() {

  }
}
