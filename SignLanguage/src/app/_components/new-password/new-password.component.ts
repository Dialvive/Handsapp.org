import { Component, Input } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent {

  @Input()
  public inputPassword1: string = '';
  @Input()
  public inputPassword2: string = '';

  constructor(
    public appComponent: AppComponent,
  ) { }
  
    public request() {
  
    }

}
