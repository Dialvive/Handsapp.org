import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Mail } from 'src/app/_models/mail.module';
import { MailService } from 'src/app/_services/mail/mail.service';

@Component({
  selector: 'app-bug-submit',
  templateUrl: './bug-submit.component.html',
  styleUrls: ['./bug-submit.component.css'],
  providers: [DatePipe],
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
    public appComponent: AppComponent,
    private http: HttpClient,
    private datePipe: DatePipe,
    private mailService: MailService,
  ) { }

  ngOnInit(): void {
    this.getURL();
    this.getNavData();
  }

  private getURL(): void {
    var url: string | null = null
    if (this.appComponent.params.has("url")) {
      url = document.referrer;
      if (url != null && url != '') {
        this.inputURL = String(url);
        this.hasParamUrl = true;
      }
    } else {
      url = "";
      this.hasParamUrl = false;
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
    var mail: Mail;
    const divider: string = "\n#########################\n";
    var myDate = new Date();
    var strDate = this.datePipe.transform(myDate, 'dd-MM-yyyy');

    var body = this.inputType + divider +
      this.hasParamUrl + divider +
      this.inputURL + divider +
      this.inputDescription + divider +
      this.inputNavData + divider +
      this.inputAgree + divider +
      this.inputResponse + divider +
      this.inputMail
    var subject = this.inputType + " " + strDate;
    mail = new Mail(subject, this.inputMail, body);
    this.mailService.sendMail(mail);

  }



}
