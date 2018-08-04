import { Component, OnInit } from '@angular/core';
import { AppAuthService } from '../../services/app-auth.service';
import { Router } from '@angular/router';
import { AppTokenService } from '../../services/app-token.service';

@Component({
  selector: 'app-page-user',
  templateUrl: './page-user.component.html',
  styleUrls: ['./page-user.component.css']
})
export class PageUserComponent implements OnInit {

  public loggedIn:boolean = false;

  constructor(
    private auth:AppAuthService,
    private router: Router,
    private token: AppTokenService
  ) {}

  ngOnInit() {
    this.auth.authStatus.subscribe(
      authCondition => {
        this.loggedIn = authCondition;
        if (!this.loggedIn){
          this.router.navigateByUrl('/login');
        }
        console.log(this.token.getIDUser());
      }
    );
  }

}
