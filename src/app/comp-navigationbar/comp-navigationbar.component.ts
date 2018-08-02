import { Component, OnInit } from '@angular/core';
import { AppAuthService } from '../app-auth.service';
import { AppTokenService } from '../app-token.service';

@Component({
  selector: 'app-comp-navigationbar',
  templateUrl: './comp-navigationbar.component.html',
  styleUrls: ['./comp-navigationbar.component.css']
})
export class CompNavigationbarComponent implements OnInit {

  public loggedIn:boolean;

  constructor(
    private auth:AppAuthService,
    private token: AppTokenService
  ) { }

  logOut(){

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
