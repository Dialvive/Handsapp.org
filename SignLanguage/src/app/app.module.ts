import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FooterComponent } from './_components/footer/footer.component';
import { HeaderComponent } from './_components/header/header.component';
import { AdBannerComponent } from './_components/ad-banner/ad-banner.component';
import { WordComponent } from './_components/word/word.component';
import { PhraseComponent } from './_components/phrase/phrase.component';
import { WordCrudComponent } from './_components/CRUD/word-crud/word-crud.component';
import { AdCategoryCrudComponent } from './_components/CRUD/ad-category-crud/ad-category-crud.component';
import { AdvertisementCrudComponent } from './_components/CRUD/advertisement-crud/advertisement-crud.component';
import { CountryCrudComponent } from './_components/CRUD/country-crud/country-crud.component';
import { FavoritePhraseCrudComponent } from './_components/CRUD/favorite-phrase-crud/favorite-phrase-crud.component';
import { FavoriteWordCrudComponent } from './_components/CRUD/favorite-word-crud/favorite-word-crud.component';
import { FriendCrudComponent } from './_components/CRUD/friend-crud/friend-crud.component';
import { FriendshipCrudComponent } from './_components/CRUD/friendship-crud/friendship-crud.component';
import { LocaleCrudComponent } from './_components/CRUD/locale-crud/locale-crud.component';
import { PhraseCrudComponent } from './_components/CRUD/phrase-crud/phrase-crud.component';
import { PhraseCategoryCrudComponent } from './_components/CRUD/phrase-category-crud/phrase-category-crud.component';
import { RegionCrudComponent } from './_components/CRUD/region-crud/region-crud.component';
import { SignLanguageCrudComponent } from './_components/CRUD/sign-language-crud/sign-language-crud.component';
import { SpokenLanguageCrudComponent } from './_components/CRUD/spoken-language-crud/spoken-language-crud.component';
import { UserCrudComponent } from './_components/CRUD/user-crud/user-crud.component';
import { WordByRegionCrudComponent } from './_components/CRUD/word-by-region-crud/word-by-region-crud.component';
import { WordCategoryCrudComponent } from './_components/CRUD/word-category-crud/word-category-crud.component';
import { CategoriesComponent } from './_components/categories/categories.component';
import { ListsComponent } from './_components/lists/lists.component';
import { SearchComponent } from './_components/search/search.component';
import { ResultsComponent } from './_components/results/results.component';
import { UserHomeComponent } from './_components/user-home/user-home.component';
import { SuperUserHomeComponent } from './_components/super-user-home/super-user-home.component';
import { EditorHomeComponent } from './_components/editor-home/editor-home.component';
import { AdvertisementsComponent } from './_components/advertisements/advertisements.component';
import { WordsComponent } from './_components/words/words.component';
import { AboutUsComponent } from './_components/about-us/about-us.component';
import { ProductsComponent } from './_components/products/products.component';
import { TermsComponent } from './_components/terms/terms.component';
import { PrivacyComponent } from './_components/privacy/privacy.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    AdBannerComponent,
    WordComponent,
    PhraseComponent,
    WordCrudComponent,
    AdCategoryCrudComponent,
    AdvertisementCrudComponent,
    CountryCrudComponent,
    FavoritePhraseCrudComponent,
    FavoriteWordCrudComponent,
    FriendCrudComponent,
    FriendshipCrudComponent,
    LocaleCrudComponent,
    PhraseCrudComponent,
    PhraseCategoryCrudComponent,
    RegionCrudComponent,
    SignLanguageCrudComponent,
    SpokenLanguageCrudComponent,
    UserCrudComponent,
    WordByRegionCrudComponent,
    WordCategoryCrudComponent,
    CategoriesComponent,
    ListsComponent,
    SearchComponent,
    ResultsComponent,
    UserHomeComponent,
    SuperUserHomeComponent,
    EditorHomeComponent,
    AdvertisementsComponent,
    WordsComponent,
    AboutUsComponent,
    ProductsComponent,
    TermsComponent,
    PrivacyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
