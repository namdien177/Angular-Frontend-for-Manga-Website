import { Component, OnInit } from '@angular/core';
import { AppAuthService } from '../../../../services/app-auth.service';
import { Router } from '@angular/router';
import { AppTokenService } from '../../../../services/app-token.service';
import { ApiLaravelService } from '../../../../services/api-laravel.service';
import { UserServicesService } from '../../../../services/user-services.service';
import { User } from '../../../../model/user';

@Component({
  selector: 'app-page-user',
  templateUrl: './page-user.component.html',
  styleUrls: ['./page-user.component.css']
})
export class PageUserComponent implements OnInit {

  public loggedIn:boolean = false;
  user:User;

  constructor(
    private auth:AppAuthService,
    private router: Router,
    private token: AppTokenService,
    private apiLaravel: ApiLaravelService,
    private userServices: UserServicesService
  ) {}

  ngOnInit() {
    this.auth.authStatus.subscribe(
      authCondition => {
        this.loggedIn = authCondition;
        if (!this.loggedIn){
          this.router.navigateByUrl('/login');
        }else{
          this.userServices.getUserInfo(this.token.getIDUser()).subscribe(
            userInfo =>{
              //@ts-ignore
              this.user = userInfo.data;
            }
          );

        }
      }
    );
  }

}
