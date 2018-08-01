import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

//route
import { RouterModule, Routes } from '@angular/router';
import { PageHomeComponent } from './page-home/page-home.component';
import { PageLoginComponent } from './page-login/page-login.component';
import { PageAllmangaComponent } from './page-allmanga/page-allmanga.component';
import { PageAllauthorComponent } from './page-allauthor/page-allauthor.component';
import { PageUnknownComponent } from './page-unknown/page-unknown.component';
import { PageMangaReadComponent } from './page-manga-read/page-manga-read.component';
import { PageMangaDetailComponent } from './page-manga-detail/page-manga-detail.component';
import { PageAuthorComponent } from './page-author/page-author.component';
import { PageUserComponent } from './page-user/page-user.component';
import { PageRegisterComponent } from './page-register/page-register.component';
import { PageForgetPasswordComponent } from './page-forget-password/page-forget-password.component';
import { PageNewPasswordComponent } from './page-new-password/page-new-password.component';
import { PageRegisterAuthorComponent } from './page-register-author/page-register-author.component';

const routes: Routes = [
  { path:'', component: PageHomeComponent, data:{depth: 1}  },
  { path:'home', component: PageHomeComponent, data:{depth: 1} },

  { path:'login', component: PageLoginComponent, data:{depth: 1}  },

  { path:'register-viewer', component: PageRegisterComponent, data:{depth: 2}},
  { path: 'register-author', component: PageRegisterAuthorComponent, data:{depth:2}},

  { path:'forget-password', component: PageForgetPasswordComponent, data:{depth: 1}},
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
      {path:'author/:id', component: PageAuthorComponent, data:{depth:2 }},
      
  { path:'user',component:PageUserComponent, data:{depth: 1} },

  { component: PageUnknownComponent, path: 'unknown', data:{depth: 1}  } //for unknown page - Should be at end
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
