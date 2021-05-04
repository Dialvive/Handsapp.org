import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mail } from 'src/app/_models/mail.module';
import { Observable } from 'rxjs';

const URI: string = "https://mailthis.to/haikode";

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(
    private http: HttpClient
  ) { }

  public sendMail(mail: Mail): Observable<boolean> {
    console.log("SendMail open: " + mail._replyto);
    return this.http.post<boolean>(URI, mail)
  }
}
