import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResultsComponent } from './_components/results/results.component';
import { SearchComponent } from './_components/search/search.component';

const routes: Routes = [
  { path: '', component:  SearchComponent },
  { path: 'search', component:  ResultsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
