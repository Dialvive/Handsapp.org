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
import { ProximamenteComponent } from './_components/proximamente/proximamente.component';
import { DonationsComponent } from './_components/donations/donations.component';
import { NotFoundComponent } from './_components/not-found/not-found.component';

const routes: Routes = [
  { path: '', component:  SearchComponent },
  { path: 'search', component:  ResultsComponent },
  { path: 'word', component: WordComponent},
  { path: 'words', component: WordsComponent},
  { path: 'about-us', component: AboutUsComponent},
  { path: 'products', component: ProductsComponent},
  { path: 'terms', component: TermsComponent},
  { path: 'privacy', component: PrivacyComponent},
  { path: 'coming-soon', component: ProximamenteComponent},
  { path: 'donors', component: DonationsComponent},
  { path: 'privacy', component: PrivacyComponent},
  { path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
