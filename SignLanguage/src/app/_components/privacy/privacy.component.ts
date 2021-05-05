import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent implements OnInit {

  public strTitle: string[] = ["Datenschutzbestimmungen", "Política de privacidad", "Privacy policy", "Politique de confidentialité ", "Politica sulla piservatezza ", "Política de privacidade"];

  constructor(
    public appComponent: AppComponent,
  ) { }

  ngOnInit(): void {
  }

}
