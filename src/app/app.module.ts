import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { PageHomeComponent } from './page-home/page-home.component';
import { PageLoginComponent } from './page-login/page-login.component';
import { PageLoginLoginComponent } from './page-login-login/page-login-login.component';
import { PageLoginRegisterComponent } from './page-login-register/page-login-register.component';
import { PageUnknownComponent } from './page-unknown/page-unknown.component';
import { PageAllmangaComponent } from './page-allmanga/page-allmanga.component';
import { PageAllauthorComponent } from './page-allauthor/page-allauthor.component';
import { CompNavigationbarComponent } from './comp-navigationbar/comp-navigationbar.component';
import { AppRoutingModule } from './app-routing.module';
import { CompSortingmangaComponent } from './comp-sortingmanga/comp-sortingmanga.component';
import { CompListmangaComponent } from './comp-listmanga/comp-listmanga.component';

import { MangaServicesService } from '../services/manga-services.service';
import { UserServicesService } from '../services/user-services.service';
import { PageMangaDetailComponent } from './page-manga-detail/page-manga-detail.component';
import { PageMangaReadComponent } from './page-manga-read/page-manga-read.component';
import { PageAuthorComponent } from './page-author/page-author.component';
import { PageUserComponent } from './page-user/page-user.component';
import { PageRegisterComponent } from './page-register/page-register.component';
import { PageForgetPasswordComponent } from './page-forget-password/page-forget-password.component';
import { PageNewPasswordComponent } from './page-new-password/page-new-password.component';
import { PageRegisterAuthorComponent } from './page-register-author/page-register-author.component';
import { ApiLaravelService } from './api-laravel.service';
import { AppTokenService } from './app-token.service';
import { AppAuthService } from './app-auth.service';

@NgModule({
  declarations: [
    AppComponent,
    PageHomeComponent,
    PageLoginComponent,
    PageLoginLoginComponent,
    PageLoginRegisterComponent,
    PageUnknownComponent,
    PageAllmangaComponent,
    PageAllauthorComponent,
    CompNavigationbarComponent,
    CompSortingmangaComponent,
    CompListmangaComponent,
    PageMangaDetailComponent,
    PageMangaReadComponent,
    PageAuthorComponent,
    PageUserComponent,
    PageRegisterComponent,
    PageForgetPasswordComponent,
    PageNewPasswordComponent,
    PageRegisterAuthorComponent      //adding component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    InfiniteScrollModule,
    HttpClientModule
  ],
  providers: [    //adding services here
    MangaServicesService,
    UserServicesService,
    ApiLaravelService,
    AppTokenService,
    AppAuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
