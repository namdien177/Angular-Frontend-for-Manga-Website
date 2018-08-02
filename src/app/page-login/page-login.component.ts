import { Component, OnInit } from '@angular/core';
import { AppAuthService } from '../app-auth.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.css']
})
export class PageLoginComponent implements OnInit {

  loggedIn:boolean;

  constructor(
    private auth: AppAuthService,
    private router:Router,
  ) { }

  ngOnInit() {
    this.auth.authStatus.subscribe(
      authCondition => this.loggedIn = authCondition
    );

    if (this.loggedIn){
      this.router.navigateByUrl('/user');
    }
  }

}
