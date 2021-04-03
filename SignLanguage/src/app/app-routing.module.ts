import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResultsComponent } from './_components/results/results.component';
import { SearchComponent } from './_components/search/search.component';
import { WordComponent } from './_components/word/word.component';
import { WordsComponent } from './_components/words/words.component';
import { AboutUsComponent } from './_components/about-us/about-us.component';
import { ProductsComponent } from './_components/products/products.component';
import { TermsComponent } from './_components/terms/terms.component';
import { PrivacyComponent } from './_components/privacy/privacy.component'

const routes: Routes = [
  { path: '', component:  SearchComponent },
  { path: 'search', component:  ResultsComponent },
  { path: 'word', component: WordComponent},
  { path: 'words', component: WordsComponent},
  { path: 'about-us', component: AboutUsComponent},
  { path: 'products', component: ProductsComponent},
  { path: 'terms', component: TermsComponent},
  { path: 'privacy', component: PrivacyComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
