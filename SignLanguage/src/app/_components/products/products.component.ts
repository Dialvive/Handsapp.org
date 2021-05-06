import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  
  public strTitle: string[] = [ "Produkte", "Productos", "Products", "Produits", "Prodotti", "Produtos"];

  constructor(
    public appComponent: AppComponent,
  ) { }

  ngOnInit(): void {
  }

}
