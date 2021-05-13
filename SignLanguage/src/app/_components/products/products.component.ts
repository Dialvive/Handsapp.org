import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  
  public strTitle: string[] = [ "Produkte von HandsApp", "Productos de HandsApp", "HandsApp Products", "Produits de HandsApp", "Prodotti di HandsApp", "Produtos de HandsApp"];

  constructor(
    public appComponent: AppComponent,
  ) { }

  ngOnInit(): void {
  }

}
