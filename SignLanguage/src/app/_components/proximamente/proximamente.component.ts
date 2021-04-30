import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-proximamente',
  templateUrl: './proximamente.component.html',
  styleUrls: ['./proximamente.component.css']
})
export class ProximamenteComponent implements OnInit {

  public strPro: string[] = ["Kommt bald!","¡Próximamente!","Coming soon!", "Bientôt disponible!", "Prossimamente!", "Em breve!"];
  public strSus: string[] = ["Benachrichtigungen erhalten!","¡Recibe notificaciones!","Receive notifications!", "Recevoir des notifications!", "Ricevi notifiche!", "Receber notificações!"];

  constructor(
    public appComponent: AppComponent,
  ) { }

  ngOnInit(): void {
  }

}
