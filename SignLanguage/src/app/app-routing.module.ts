import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhraseComponent } from './_components/phrase/phrase.component';
import { ResultsComponent } from './_components/results/results.component';
import { SearchComponent } from './_components/search/search.component';
import { WordComponent } from './_components/word/word.component';

const routes: Routes = [
  { path: '', component:  SearchComponent },
  { path: 'search', component:  ResultsComponent },
  { path: 'word', component: WordComponent},
  { path: 'phrase', component: PhraseComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
