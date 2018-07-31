import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ApiLaravelService} from '../api-laravel.service';

@Component({
  selector: 'app-page-login-login',
  templateUrl: './page-login-login.component.html',
  styleUrls: ['./page-login-login.component.css']
})
export class PageLoginLoginComponent implements OnInit {
  public formData = {
    email: null,
    password: null,
    remember: null
  };
  public errors = null;

  constructor(private http: HttpClient, private apiLaravel: ApiLaravelService) { }

  ngOnInit() {
  }

  onSubmit() {
    return this.apiLaravel.getDataGet('login', this.formData).subscribe(
      Response => {
        console.log(Response);
      },
      error => {
        this.handleError(error);
      }
    );
  }

  handleError(error) {
    this.errors = error.error.error;
  }

  onRemember() {

  }

}
