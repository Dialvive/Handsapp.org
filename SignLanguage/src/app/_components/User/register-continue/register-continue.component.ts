import { Component, Input, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-register-continue',
  templateUrl: './register-continue.component.html',
  styleUrls: ['./register-continue.component.css']
})
export class RegisterContinueComponent implements OnInit {

  @Input()
  public inputLname: string = '';
  @Input()
  public inputFname: string = '';
  @Input()
  public inputDate: string;
  @Input()
  public inputUser: string = '';
  @Input()
  public inputMail: string = '';
  @Input()
  public inputCountry: string = '';
  @Input()
  public inputPassword1: string = '';
  @Input()
  public inputPassword2: string = '';
  @Input()
  public inputNotChild: boolean = false;
  @Input()
  public inputTOC: boolean = false;
  
  public todayStr: string = '';
  public todayYear: number = 0;

  constructor(
    public appComponent: AppComponent,
  ) {
    this.inputDate = String(+new Date().toISOString().split('-')[0]-13) + new Date().toISOString().substring(4,10);
  }


  ngOnInit(): void {
    this.setMaxDate();

  }

  public register() {

  }

  //Sets the max date to today 13 years ago.
  private setMaxDate(): void {
    const today: Date = new Date();
    let dd: string = String(today.getDate());
    let mm: string = String(today.getMonth() + 1); //January is 0!
    const yyyy = today.getFullYear() - 13;
    if(+dd<10){
        dd = '0' + dd
    } 
    if(+mm<10){
        mm = '0' + mm
    }
    this.todayStr = yyyy+'-'+mm+'-'+dd;
    this.todayYear = yyyy;
    document.getElementById("bdate")?.setAttribute("max", this.todayStr);
  }

}
