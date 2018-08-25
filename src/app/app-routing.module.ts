import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

//route
import { RouterModule, Routes } from '@angular/router';
import { PageHomeComponent } from './views/MainPage/page-home/page-home.component';
import { PageLoginComponent } from './views/MainPage/page-login/page-login.component';
import { PageAllmangaComponent } from './views/MainPage/page-allmanga/page-allmanga.component';
import { PageAllauthorComponent } from './views/MainPage/page-allauthor/page-allauthor.component';
import { PageUnknownComponent } from './views/MainPage/page-unknown/page-unknown.component';
import { PageMangaReadComponent } from './views/MainPage/page-manga-read/page-manga-read.component';
import { PageMangaDetailComponent } from './views/MainPage/page-manga-detail/page-manga-detail.component';
import { PageAuthorComponent } from './views/MainPage/page-author/page-author.component';
import { PageUserComponent } from './views/MainPage/page-user/page-user.component';
import { PageRegisterComponent } from './views/MainPage/page-register/page-register.component';
import { PageForgetPasswordComponent } from './views/MainPage/page-forget-password/page-forget-password.component';
import { PageNewPasswordComponent } from './views/MainPage/page-new-password/page-new-password.component';
import { PageRegisterAuthorComponent } from './views/MainPage/page-register-author/page-register-author.component';
import { AppBeforeloginService } from '../services/app-beforelogin.service';
import { AppAffterloginService } from '../services/app-affterlogin.service';
import { PageUploadComponent } from './views/MainPage/page-upload/page-upload.component';
import { PageSearchComponent } from './views/MainPage/page-search/page-search.component';
import { PageUploadChapComponent } from './views/MainPage/page-upload-chap/page-upload-chap.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full', data:{depth: 1}  },
  { path:'home', component: PageHomeComponent, data:{depth: 1} },

  { path:'login', component: PageLoginComponent, data:{depth: 1}, canActivate:[AppBeforeloginService]  },

  { path:'register-viewer', component: PageRegisterComponent, data:{depth: 2}, canActivate:[AppBeforeloginService] },
  { path: 'register-author', component: PageRegisterAuthorComponent, data:{depth:2}, canActivate:[AppBeforeloginService] },

  { path:'forget-password', component: PageForgetPasswordComponent, data:{depth: 1}, canActivate:[AppBeforeloginService]},
  { path:'new-password', component: PageNewPasswordComponent, data: {depth:1}},

  // { path:'manga', component: PageAllmangaComponent, data:{depth: 1}, children:[
  //   {path:':id', component:  PageMangaDetailComponent, data:{depth:2}, children:[
  //     {path:':chap',component: PageMangaReadComponent, data:{depth:3}}
  //   ] }
  // ]},

  { path:'manga', component: PageAllmangaComponent, data:{depth: 1} },
      {path:'manga/:id', component:  PageMangaDetailComponent, data:{depth:2} },
          {path:'manga/:id/chap/:idChap',component: PageMangaReadComponent, data:{depth:3}},

  { path:'author', component: PageAllauthorComponent, data:{depth: 1} },
      { path:'author/:id', component: PageAuthorComponent, data:{depth:2 }},
      { path:'manage/manga/:id', component: PageUploadChapComponent, data: {depth:2}},
      
  {path:'upload', component:PageUploadComponent, data:{depth:2}},
      
  { path:'user',component:PageUserComponent, data:{depth: 1}, canActivate:[AppAffterloginService] },

  { path:'search', component: PageSearchComponent, data: {depth: 2}},
  { component: PageUnknownComponent, path: '**', data:{depth: 1}  } //for unknown page - Should be at end
];

@NgModule({
  imports: [
    // CommonModule
    RouterModule.forRoot(routes)
  ],
  // declarations: []
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
