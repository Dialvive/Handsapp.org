import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Mail } from 'src/app/_models/mail';
import { MailService } from 'src/app/_services/mail/mail.service';

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
  private mail: Mail | null = null;


  constructor(
    public appComponent: AppComponent,
    private mailService: MailService
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
    console.log(this.sendMail(
      new Mail(
        'HANDSAPP.ORG REPORT: ' + this.inputType, 
        this.htmlifyString(this.arrangeMailTxt()))));
  }

  private arrangeMailTxt(): string {
    const divider = "<br>------------------------------------------------<br>"
    return divider
      + 'RELATED URL: ' + '<a href="' + this.inputURL + '">' + this.inputURL + '</a>' + divider
      + 'DESCRIPTION: ' + this.inputDescription + divider
      + (this.inputType == "Error" ?
        'NAVDATA: ' + this.inputNavData :
        '')
      + 'PLEASE REPLY?: ' + 
        (this.inputResponse ? 
          'YES' + divider + 'MAIL: ' + this.inputMail : 
          'NO') + divider
      + 'ACCEPTED PRIVACY POLICY: ' + (this.inputAgree? 'YES' : 'NO') + divider;
  }

  private htmlifyString(text: string): string { 
    const tokens = text.split('\n');
    var htmledTxt = '';
    for (var i = 0; i < tokens.length; i++) {
      htmledTxt += tokens[i] + ' <br> '
    }
    return htmledTxt;
  }

  private sendMail(mail: Mail): void {
    this.mailService.sendMail(mail).subscribe(
      response => {
        return Boolean(response);
      }, 
      err => this.appComponent.navigateParams("/502", this.appComponent.locale, "", ""));
  }





}
