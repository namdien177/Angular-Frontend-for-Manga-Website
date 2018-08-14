import { Component, OnInit } from '@angular/core';
import { AppAuthService } from '../../../../services/app-auth.service';
import { AppTokenService } from '../../../../services/app-token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comp-navigationbar',
  templateUrl: './comp-navigationbar.component.html',
  styleUrls: ['./comp-navigationbar.component.css']
})
export class CompNavigationbarComponent implements OnInit {

  public loggedIn:boolean;

  constructor(
    private auth:AppAuthService,
    private token: AppTokenService,
    private router: Router
  ) { }

  logOut(event:MouseEvent){
    event.preventDefault();
    this.auth.changeAuthStatus(false);
    this.token.removeToken();
    this.router.navigateByUrl('/');
  }

  ngOnInit() {
    if(this.token.isValid()){
      this.auth.changeAuthStatus(true);
    }
    this.auth.authStatus.subscribe(
      authCondition => this.loggedIn = authCondition
    );
  }

}
