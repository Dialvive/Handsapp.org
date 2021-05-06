import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent implements OnInit {

  public strTitle: string[] = ["Datenschutzbestimmungen", "Política de privacidad", "Privacy policy", "Politique de confidentialité ", "Politica sulla piservatezza ", "Política de privacidade"];
  public strAlert: string[] =
  ["Im Moment haben wir dieses Dokument nur auf Spanisch.",
  "",
  "At the moment, we only have this document in Spanish.",
  "Pour le moment, nous n'avons que ce document en espagnol.",
  "Al momento, abbiamo solo questo documento in spagnolo.",
  "No momento, temos este documento apenas em espanhol."];
  
  constructor(
    public appComponent: AppComponent,
  ) { }

  ngOnInit(): void {
  }

}
