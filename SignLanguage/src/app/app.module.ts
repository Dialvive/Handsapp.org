import { AdsenseModule } from 'ng2-adsense';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { AppRoutingModule } from './app-routing.module';
import { JsonLdModule } from './_modules/json-ld/json-ld.module';
import { ClipboardModule } from 'ngx-clipboard';

import { GoogleAnalyticsService } from './_services/GoogleAnalytics/google-analytics.service';

import { AppComponent } from './app.component';
import { FooterComponent } from './_components/General/footer/footer.component';
import { HeaderComponent } from './_components/General/header/header.component';
import { AdBannerComponent } from './_components/FunctionalComponents/ad-banner/ad-banner.component';
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

//import { WordCrudComponent } from './_components/CRUD/word-crud/word-crud.component';
//import { AdCategoryCrudComponent } from './_components/CRUD/ad-category-crud/ad-category-crud.component';
//import { AdvertisementCrudComponent } from './_components/CRUD/advertisement-crud/advertisement-crud.component';
//import { CountryCrudComponent } from './_components/CRUD/country-crud/country-crud.component';
//import { FavoritePhraseCrudComponent } from './_components/CRUD/favorite-phrase-crud/favorite-phrase-crud.component';
//import { FavoriteWordCrudComponent } from './_components/CRUD/favorite-word-crud/favorite-word-crud.component';
//import { FriendCrudComponent } from './_components/CRUD/friend-crud/friend-crud.component';
//import { FriendshipCrudComponent } from './_components/CRUD/friendship-crud/friendship-crud.component';
//import { LocaleCrudComponent } from './_components/CRUD/locale-crud/locale-crud.component';
//import { PhraseCrudComponent } from './_components/CRUD/phrase-crud/phrase-crud.component';
//import { PhraseCategoryCrudComponent } from './_components/CRUD/phrase-category-crud/phrase-category-crud.component';
//import { RegionCrudComponent } from './_components/CRUD/region-crud/region-crud.component';
//import { SignLanguageCrudComponent } from './_components/CRUD/sign-language-crud/sign-language-crud.component';
//import { SpokenLanguageCrudComponent } from './_components/CRUD/spoken-language-crud/spoken-language-crud.component';
import { UserCrudComponent } from './_components/User/user-crud/user-crud.component';
import { LoginComponent } from './_components/User/login/login.component';
import { RegisterComponent } from './_components/User/register/register.component';
import { ForgotPasswordComponent } from './_components/User/forgot-password/forgot-password.component';
import { NewPasswordComponent } from './_components/User/new-password/new-password.component';
import { ExistingAccountComponent } from './_components/User/existing-account/existing-account.component';
import { RegisterContinueComponent } from './_components/User/register-continue/register-continue.component';
//import { WordByRegionCrudComponent } from './_components/CRUD/word-by-region-crud/word-by-region-crud.component';
//import { WordCategoryCrudComponent } from './_components/CRUD/word-category-crud/word-category-crud.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    AdBannerComponent,
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
    //WordCrudComponent,
    //AdCategoryCrudComponent,
    //AdvertisementCrudComponent,
    //CountryCrudComponent,
    //FavoritePhraseCrudComponent,
    //FavoriteWordCrudComponent,
    //FriendCrudComponent,
    //FriendshipCrudComponent,
    //LocaleCrudComponent,
    //PhraseCrudComponent,
    //PhraseCategoryCrudComponent,
    //RegionCrudComponent,
    //SignLanguageCrudComponent,
    //SpokenLanguageCrudComponent,
    UserCrudComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    NewPasswordComponent,
    ExistingAccountComponent,
    RegisterContinueComponent,
    //WordByRegionCrudComponent,
    //WordCategoryCrudComponent
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
    NgxCaptchaModule,
    JsonLdModule,
    ClipboardModule
  ],
  providers: [GoogleAnalyticsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
