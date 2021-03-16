import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhraseCategoryCrudComponent } from './_components/CRUD/phrase-category-crud/phrase-category-crud.component';
import { WordCategoryCrudComponent} from './_components/CRUD/word-category-crud/word-category-crud.component';
import { RegionCrudComponent } from './_components/CRUD/region-crud/region-crud.component';
import { CountryCrudComponent } from './_components/CRUD/country-crud/country-crud.component';
import { SignLanguageCrudComponent } from './_components/CRUD/sign-language-crud/sign-language-crud.component';
import { SpokenLanguageCrudComponent } from './_components/CRUD/spoken-language-crud/spoken-language-crud.component';
import { LocaleCrudComponent } from './_components/CRUD/locale-crud/locale-crud.component';
import { PhraseCrudComponent } from './_components/CRUD/phrase-crud/phrase-crud.component';
import { WordCrudComponent } from './_components/CRUD/word-crud/word-crud.component';
import { PhraseComponent } from './_components/phrase/phrase.component';
import { ResultsComponent } from './_components/results/results.component';
import { SearchComponent } from './_components/search/search.component';
import { WordComponent } from './_components/word/word.component';
import { WordsComponent } from './_components/words/words.component';

const routes: Routes = [
  { path: 'SU/CRUD/wordcategory', component: WordCategoryCrudComponent},
  { path: 'SU/CRUD/phrasecategory', component: PhraseCategoryCrudComponent},
  { path: 'SU/CRUD/region', component: RegionCrudComponent},
  { path: 'SU/CRUD/country', component: CountryCrudComponent},
  { path: 'SU/CRUD/signlanguage', component: SignLanguageCrudComponent},
  { path: 'SU/CRUD/spokenlanguage', component: SpokenLanguageCrudComponent},
  { path: 'SU/CRUD/locale', component: LocaleCrudComponent},
  { path: 'SU/CRUD/word', component: WordCrudComponent},
  { path: 'SU/CRUD/phrase', component: PhraseCrudComponent},
  { path: '', component:  SearchComponent },
  { path: 'search', component:  ResultsComponent },
  { path: 'word', component: WordComponent},
  { path: 'words', component: WordsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }