import { Component } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-proximamente',
  templateUrl: './proximamente.component.html',
  styleUrls: ['./proximamente.component.css']
})
export class ProximamenteComponent {

  public strTitle: string[] = ["Kommt bald!","¡Próximamente!","Coming soon!", "Bientôt disponible!", "Prossimamente!", "Em breve!"];
  public strSus: string[] = ["Benachrichtigungen erhalten!","¡Recibe notificaciones!","Receive notifications!", "Recevoir des notifications!", "Ricevi notifiche!", "Receber notificações!"];

  constructor(
    public appComponent: AppComponent,
  ) { }

}
