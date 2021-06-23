import { Component } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-existing-account',
  templateUrl: './existing-account.component.html',
  styleUrls: ['./existing-account.component.css']
})
export class ExistingAccountComponent {

  private socialNetworks: string[] = ["Google account", "Apple ID", "Facebook account"];
  public social: string = this.socialNetworks[1];

  constructor(
    public appComponent: AppComponent,
  ) { }
  
    public login() {
  
    }

    public cancel() {
  
    }

}
