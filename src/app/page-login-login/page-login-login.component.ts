import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ApiLaravelService} from '../../services/api-laravel.service';
import { AppTokenService } from '../../services/app-token.service';
import { Router } from '@angular/router';
import { AppAuthService } from '../../services/app-auth.service';

@Component({
  selector: 'app-page-login-login',
  templateUrl: './page-login-login.component.html',
  styleUrls: ['./page-login-login.component.css']
})
export class PageLoginLoginComponent implements OnInit {
  
  public formData = {
    email: null,
    password: null,
  };
  public errors = null;

  constructor(
    private http: HttpClient, 
    private apiLaravel: ApiLaravelService,
    private tokenservices: AppTokenService,
    private router: Router,
    private auth: AppAuthService) { }

  ngOnInit() {
  }

  onSubmit() {
    return this.apiLaravel.getDataPost('auth/login', this.formData).subscribe(
      Response => {
        this.handleResponse(Response);
      },
      error => {
        this.handleError(error);
      }
    );
  }

  handleError(error) {
    this.errors = error.error.error;
  }

  handleResponse(data): any {
    this.tokenservices.handle(data.access_token);
    this.auth.changeAuthStatus(true);
    this.router.navigateByUrl('/');
  }

}
