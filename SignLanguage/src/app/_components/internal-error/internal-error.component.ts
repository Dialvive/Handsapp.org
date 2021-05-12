import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-internal-error',
  templateUrl: './internal-error.component.html',
  styleUrls: ['./internal-error.component.css']
})
export class InternalErrorComponent implements OnInit {

  public strTitle: string[] = [ "Fehler 502", "Error 502", "Error 502", "Erreur 502", "Errore 502", "Erro 502"];

  constructor(
    public appComponent: AppComponent,
  ) { }

  ngOnInit(): void {
  }

}
