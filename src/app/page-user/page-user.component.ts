import { Component, OnInit } from '@angular/core';
import { AppAuthService } from '../app-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-user',
  templateUrl: './page-user.component.html',
  styleUrls: ['./page-user.component.css']
})
export class PageUserComponent implements OnInit {

  public loggedIn:boolean = false;

  constructor(
    private auth:AppAuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.auth.authStatus.subscribe(
      authCondition => this.loggedIn = authCondition
    );

    if (!this.loggedIn){
      this.router.navigateByUrl('/login');
    }
  }

}
