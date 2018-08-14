import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiLaravelService } from '../../../../services/api-laravel.service';

@Component({
  selector: 'app-page-register-author',
  templateUrl: './page-register-author.component.html',
  styleUrls: ['./page-register-author.component.css']
})
export class PageRegisterAuthorComponent implements OnInit {

  constructor(
    private http:HttpClient,
    private apiServices:ApiLaravelService) { }

  ngOnInit() {
  }

  public formData={
    email:null,
    password: null,
    password_confirmation:null,
    name:null,
    authorize: 1
  };

  onSubmit(){
    return this.apiServices.getDataPost('signupauthor',this.formData).subscribe(
      Response=> {
        console.log(Response);
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

}
