import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-bug-submit',
  templateUrl: './bug-submit.component.html',
  styleUrls: ['./bug-submit.component.css']
})
export class BugSubmitComponent implements OnInit {
  public inputType: string = "Suggestion";
  public hasParamUrl: boolean = false;
  public inputURL: string = '';
  public inputDescription: string = '';
  public inputNavData: string = '';
  public inputAgree: boolean = false;
  public inputResponse: boolean = false;
  public inputMail: string = '';


  constructor(
    public appComponent: AppComponent
    ) { }

  ngOnInit(): void {
  this.getURL();
  this.getNavData();
  }

  private getURL(): void {
    var url: string | null = this.appComponent.params.get("url");
    if (url != null && url != '' ) {
      this.inputURL = String(url);
      this.hasParamUrl = true;
    }
  }

  private getNavData(): void {
    this.inputNavData = 
    "platform: " + navigator.platform + "\n"
    + "userAgent: " + navigator.userAgent + "\n" 
    + "appname: " + navigator.appName + ' ' + navigator.appVersion + "\n"
    + "product: " + navigator.product + "\n"
    + "webdriver: " + navigator.webdriver + "\n"
    + "languages: " + navigator.languages + "\n"
    + "cookieEnabled: " + navigator.cookieEnabled + "\n"
    + "doNotTrack: " + navigator.doNotTrack + "\n"
    + "javaEnabled: " + navigator.javaEnabled() + "\n"
    + "win w: " + window.screen.width + "\n"
    + "win h: " + window.screen.height + "\n"
    + "win availw: " + window.screen.availWidth + "\n"
    + "win availh: " + window.screen.availHeight + "\n"
    + "doc charset: " + document.characterSet + "\n"
    + "doc compatMode: " + document.compatMode + "\n"
    + "doc referrer: " + document.referrer + "\n";
  }

  public register(): void { 
    
  }



}
