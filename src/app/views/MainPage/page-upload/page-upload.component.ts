import { Component, OnInit } from '@angular/core';
import { ApiLaravelService } from '../../../../services/api-laravel.service';
import { AppTokenService } from '../../../../services/app-token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-upload',
  templateUrl: './page-upload.component.html',
  styleUrls: ['./page-upload.component.css']
})
export class PageUploadComponent implements OnInit {

  constructor(
    private apiServices:ApiLaravelService,
    private token:AppTokenService,
    private router:Router
  ) { }

  ngOnInit() {
  }

  public formData={
    name:null,
    metaURL: null,
    cover:null,
    releaseYear:null,
    description: 1,
    totalChap:null,
    information:null
  };

  metaData(name:string):string{
    if(name.length>0){
      let split = name.split(' ');
      let meta:string ="";
      split.forEach(str=>{
        meta=meta+str+"-";
      });
      return meta.substring(0,meta.length-1);
    }
  }

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
    this.token.handle(data.access_token);
    this.router.navigateByUrl('/login');
  }

}
