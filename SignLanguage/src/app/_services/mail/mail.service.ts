import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mail } from 'src/app/_models/mail';
import { Observable } from 'rxjs';

const URI: string = "https://api.handsapp.org/v1/email"

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(
    private http: HttpClient
    ) { }

  public sendMail(mail: Mail): Observable<string> {
    return this.http.post<string>(URI, mail)
  }
}
