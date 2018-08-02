import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiLaravelService } from '../api-laravel.service';
import { AppTokenService } from '../app-token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-register',
  templateUrl: './page-register.component.html',
  styleUrls: ['./page-register.component.css']
})
export class PageRegisterComponent implements OnInit {

  constructor(
    private http:HttpClient,
    private apiServices:ApiLaravelService,
    private tokenservices:AppTokenService,
    private router: Router) { }

  ngOnInit() {
  }

  public formData={
    email:null,
    password: null,
    password_confirmation:null,
    name:null,
    authorize: 2
  };

  onSubmit(){
    return this.apiServices.getDataPost('signupviewer',this.formData).subscribe(
      Response=> {
        this.handleResponce(Response);
      },
      error=>{
        this.handleError(error);
      }
    )
  }

  public errors = [];
  handleError(error){
    this.errors = error.error.errors;
  }

  handleResponce(data): any {
    this.tokenservices.handle(data.access_token);
    this.router.navigateByUrl('/');
  }

}
