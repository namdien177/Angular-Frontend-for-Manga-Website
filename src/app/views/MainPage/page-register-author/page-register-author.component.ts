import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiLaravelService } from '../../../../services/api-laravel.service';
import { AppTokenService } from '../../../../services/app-token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-register-author',
  templateUrl: './page-register-author.component.html',
  styleUrls: ['./page-register-author.component.css']
})
export class PageRegisterAuthorComponent implements OnInit {

  constructor(
    private http:HttpClient,
    private apiServices:ApiLaravelService,
    private tokenservices:AppTokenService,
    private router:Router) { }

  ngOnInit() {
  }

  public formData={
    email:null,
    password: null,
    password_confirmation:null,
    name:null,
    authorize: 1,
    authorname:null,
    information:null
  };

  onSubmit(){
    return this.apiServices.getDataPost('auth/signupauthor',this.formData).subscribe(
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
    this.router.navigateByUrl('/login');
  }

}
