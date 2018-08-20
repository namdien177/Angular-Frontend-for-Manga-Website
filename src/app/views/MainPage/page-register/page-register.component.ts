import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiLaravelService } from '../../../../services/api-laravel.service';
import { AppTokenService } from '../../../../services/app-token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-register',
  templateUrl: './page-register.component.html',
  styleUrls: ['./page-register.component.css']
})
export class PageRegisterComponent implements OnInit {

  loading = true;

  constructor(
    private http:HttpClient,
    private apiServices:ApiLaravelService,
    private tokenservices:AppTokenService,
    private router: Router) { }

  ngOnInit() {
    this.loading = false;
  }

  public formData={
    email:"",
    password: "",
    password_confirmation:"",
    name:"",
    authorize: 2
  };

  onSubmit(){
    this.loading = true;
    return this.apiServices.getDataPost('auth/signupviewer',this.formData).subscribe(
      Response=> {
        this.handleResponce(Response);
        this.loading = false;
      },
      error=>{
        this.handleError(error);
        this.loading = false;
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
