import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResultsComponent } from './_components/General/results/results.component';
import { SearchComponent } from './_components/General/search/search.component';
import { WordComponent } from './_components/Words/word/word.component';
import { WordsComponent } from './_components/Words/words/words.component';
import { AboutUsComponent } from './_components/About/about-us/about-us.component';
import { ProductsComponent } from './_components/About/products/products.component';
import { TermsComponent } from './_components/Legal/terms/terms.component';
import { PrivacyComponent } from './_components/Legal/privacy/privacy.component'
import { ProximamenteComponent } from './_components/Errors/proximamente/proximamente.component';
import { DonationsComponent } from './_components/About/donations/donations.component';
import { NotFoundComponent } from './_components/Errors/not-found/not-found.component';
import { ThirdPartiesComponent } from './_components/Legal/third-parties/third-parties.component';
import { BugSubmitComponent } from './_components/About/bug-submit/bug-submit.component';
import { InternalErrorComponent } from './_components/Errors/internal-error/internal-error.component';
import { LoginComponent } from './_components/User/login/login.component';
import { RegisterComponent } from './_components/User/register/register.component';
import { ForgotPasswordComponent } from './_components/User/forgot-password/forgot-password.component';
import { NewPasswordComponent } from './_components/User/new-password/new-password.component';
import { ExistingAccountComponent } from './_components/User/existing-account/existing-account.component';
import { RegisterContinueComponent } from './_components/User/register-continue/register-continue.component';
import { UserHomeComponent } from './_components/User/user-home/user-home.component';
import { UserCrudComponent } from './_components/User/user-crud/user-crud.component';

const routes: Routes = [
  { path: '', component:  SearchComponent },
  { path: 'search', component:  ResultsComponent },
  { path: 'word', component: WordComponent},
  { path: 'words', component: WordsComponent},
  { path: 'about-us', component: AboutUsComponent},
  { path: 'products', component: ProductsComponent},
  { path: 'terms', component: TermsComponent},
  { path: 'privacy', component: PrivacyComponent},
//{ path: 'coming-soon', component: ProximamenteComponent},
  { path: 'donors', component: DonationsComponent},
  { path: '3rdpartylicences', component: ThirdPartiesComponent},
  { path: 'bug', component: BugSubmitComponent},
  { path: '404', component: NotFoundComponent},
  { path: '502', component: InternalErrorComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'register-continue', component: RegisterContinueComponent},
  { path: 'forgot', component: ForgotPasswordComponent},
  { path: 'new-password', component: NewPasswordComponent},
  { path: 'existing-account', component: ExistingAccountComponent},
  { path: 'account', component: UserHomeComponent},
  { path: 'account/settings', component: UserCrudComponent},

  { path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'corrected',scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
