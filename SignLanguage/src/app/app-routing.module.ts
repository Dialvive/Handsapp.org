import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhraseCategoryCrudComponent } from './_components/CRUD/phrase-category-crud/phrase-category-crud.component';
import { WordCategoryCrudComponent} from './_components/CRUD/word-category-crud/word-category-crud.component';
import { RegionCrudComponent } from './_components/CRUD/region-crud/region-crud.component'


const routes: Routes = [
  { path: 'SU/CRUD/wordcategory', component: WordCategoryCrudComponent},
  { path: 'SU/CRUD/phrasecategory', component: PhraseCategoryCrudComponent},
  { path: 'SU/CRUD/region', component: RegionCrudComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }