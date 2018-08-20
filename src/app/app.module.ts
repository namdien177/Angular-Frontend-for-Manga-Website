import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { PageHomeComponent } from './views/MainPage/page-home/page-home.component';
import { PageLoginComponent } from './views/MainPage/page-login/page-login.component';
import { PageLoginLoginComponent } from './views/MainPage/page-login-login/page-login-login.component';
import { PageLoginRegisterComponent } from './views/MainPage/page-login-register/page-login-register.component';
import { PageUnknownComponent } from './views/MainPage/page-unknown/page-unknown.component';
import { PageAllmangaComponent } from './views/MainPage/page-allmanga/page-allmanga.component';
import { PageAllauthorComponent } from './views/MainPage/page-allauthor/page-allauthor.component';
import { CompNavigationbarComponent } from './views/ComponentPage/comp-navigationbar/comp-navigationbar.component';
import { AppRoutingModule } from './app-routing.module';
import { CompSortingmangaComponent } from './views/ComponentPage/comp-sortingmanga/comp-sortingmanga.component';
import { CompListmangaComponent } from './views/ComponentPage/comp-listmanga/comp-listmanga.component';

import { MangaServicesService } from '../services/manga-services.service';
import { UserServicesService } from '../services/user-services.service';
import { PageMangaDetailComponent } from './views/MainPage/page-manga-detail/page-manga-detail.component';
import { PageMangaReadComponent } from './views/MainPage/page-manga-read/page-manga-read.component';
import { PageAuthorComponent } from './views/MainPage/page-author/page-author.component';
import { PageUserComponent } from './views/MainPage/page-user/page-user.component';
import { PageRegisterComponent } from './views/MainPage/page-register/page-register.component';
import { PageForgetPasswordComponent } from './views/MainPage/page-forget-password/page-forget-password.component';
import { PageNewPasswordComponent } from './views/MainPage/page-new-password/page-new-password.component';
import { PageRegisterAuthorComponent } from './views/MainPage/page-register-author/page-register-author.component';
import { ApiLaravelService } from '../services/api-laravel.service';
import { AppTokenService } from '../services/app-token.service';
import { AppAuthService } from '../services/app-auth.service';
import { AppAffterloginService } from '../services/app-affterlogin.service';
import { AppBeforeloginService } from '../services/app-beforelogin.service';
import { SpinnerComponent } from './views/ComponentPage/spinner/spinner.component';
import { ModalComponent as ModalComComponent } from './views/ComponentPage/modal/modal.component';
import { PageUploadComponent } from './views/MainPage/page-upload/page-upload.component';

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
    PageRegisterAuthorComponent,
    SpinnerComponent,
    ModalComComponent,
    PageUploadComponent      //adding component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    InfiniteScrollModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [    //adding services here
    MangaServicesService,
    UserServicesService,
    ApiLaravelService,
    AppTokenService,
    AppAuthService,
    AppAffterloginService,
    AppBeforeloginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
