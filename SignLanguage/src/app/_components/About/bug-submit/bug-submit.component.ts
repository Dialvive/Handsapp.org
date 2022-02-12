import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Mail } from 'src/app/_models/mail';
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
  public sent: string = '';
  public strTitle: string[] = 
    [ "Melden Sie einen Fehler, einen Vorschlag oder einen unangemessenen Inhalt",
    "Reportar error, sugerencia, o contenido inapropiado",
    "Report a bug, suggestion, or inappropriate content",
    "Signaler un bug, une suggestion ou un contenu inapproprié",
    "Segnala un bug, un suggerimento o un contenuto inappropriato",
    "Denunciar um bug, sugestão ou conteúdo impróprio"];

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
    let url: string | null = null;
    if (this.appComponent.params.has("url")) {
      url = document.referrer;
      if (url != null && url != '') {
        this.inputURL = String(url);
        this.hasParamUrl = true;
      }
    } else {
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
    let mail: Mail;
    const divider: string = "\n#########################\n";
    const myDate = new Date();
    const strDate = this.datePipe.transform(myDate, 'dd-MM-yyyy');

    const body = "-Report Type: \n" + this.inputType + divider +
        "-HasParamURL? \n" + this.hasParamUrl + divider +
        "-Input URL: \n" + this.inputURL + divider +
        "-Input Description: \n" + this.inputDescription + divider +
        "-Input NavData: \n" + this.inputNavData + divider +
        "-AgreedPrivacy? \n" + this.inputAgree + divider +
        "-Reply? \n" + this.inputResponse + divider;
    const subject = this.inputType + " " + strDate;
    mail = new Mail(subject, this.inputMail, body);
    this.sendMail(mail);
  }

  private async sendMail(mail: Mail) {
    this.sent = "WAIT";
    this.mailService.sendMail(mail).subscribe(
      response => {
        this.sent = "TRUE";
      }, 
      err => {
        this.sent = "FALSE";
        console.log(err);
      });
  }





}
