import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonLdComponent } from '../../_components/FunctionalComponents/json-ld/json-ld.component'



@NgModule({
  declarations: [
    JsonLdComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    JsonLdComponent,
  ]
})
export class JsonLdModule { }
