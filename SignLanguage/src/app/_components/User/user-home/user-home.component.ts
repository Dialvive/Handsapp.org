import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  public userVarFname: string = '';
  public userVarLname: string = '';
  public userVarUser: string = '';
  public userVarPoints: number = 0;
  public userVarFriends: number = 0;
  public userVarCountry: string = '';


  constructor(
    public appComponent: AppComponent,
  ) { }

  ngOnInit(): void {
  }

}
