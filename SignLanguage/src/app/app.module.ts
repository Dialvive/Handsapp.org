import { AdsenseModule } from 'ng2-adsense';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { JsonLdModule } from './_modules/json-ld/json-ld.module';
import { ClipboardModule } from 'ngx-clipboard';

import { GoogleAnalyticsService } from './_services/GoogleAnalytics/google-analytics.service';

import { AppComponent } from './app.component';
import { FooterComponent } from './_components/General/footer/footer.component';
import { HeaderComponent } from './_components/General/header/header.component';
import { WordComponent } from './_components/Words/word/word.component';
import { SearchComponent } from './_components/General/search/search.component';
import { ResultsComponent } from './_components/General/results/results.component';
import { UserHomeComponent } from './_components/User/user-home/user-home.component';
import { WordsComponent } from './_components/Words/words/words.component';
import { AboutUsComponent } from './_components/About/about-us/about-us.component';
import { ProductsComponent } from './_components/About/products/products.component';
import { TermsComponent } from './_components/Legal/terms/terms.component';
import { PrivacyComponent } from './_components/Legal/privacy/privacy.component';
import { ProximamenteComponent } from './_components/Errors/proximamente/proximamente.component';
import { NotFoundComponent } from './_components/Errors/not-found/not-found.component';
import { DonationsComponent } from './_components/About/donations/donations.component';
import { ThirdPartiesComponent } from './_components/Legal/third-parties/third-parties.component';
import { BugSubmitComponent } from './_components/About/bug-submit/bug-submit.component';
import { InternalErrorComponent } from './_components/Errors/internal-error/internal-error.component';
import { UserCrudComponent } from './_components/User/user-crud/user-crud.component';
import { LoginComponent } from './_components/User/login/login.component';
import { RegisterComponent } from './_components/User/register/register.component';
import { ForgotPasswordComponent } from './_components/User/forgot-password/forgot-password.component';
import { NewPasswordComponent } from './_components/User/new-password/new-password.component';
import { ExistingAccountComponent } from './_components/User/existing-account/existing-account.component';
import { RegisterContinueComponent } from './_components/User/register-continue/register-continue.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    WordComponent,
    SearchComponent,
    ResultsComponent,
    UserHomeComponent,
    WordsComponent,
    AboutUsComponent,
    ProductsComponent,
    TermsComponent,
    PrivacyComponent,
    ProximamenteComponent,
    NotFoundComponent,
    DonationsComponent,
    ThirdPartiesComponent,
    BugSubmitComponent,
    InternalErrorComponent,
    UserCrudComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    NewPasswordComponent,
    ExistingAccountComponent,
    RegisterContinueComponent,
  ],
  imports: [
    AdsenseModule.forRoot({
      adClient: 'ca-pub-7365943596040772'
    }),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    JsonLdModule,
    ClipboardModule
  ],
  providers: [GoogleAnalyticsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
