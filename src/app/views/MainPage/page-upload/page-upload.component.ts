import { Component, OnInit } from '@angular/core';
import { ApiLaravelService } from '../../../../services/api-laravel.service';
import { AppTokenService } from '../../../../services/app-token.service';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { of } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap, tap, catchError
} from 'rxjs/operators';
import { TagManga } from '../../../../model/tags';
import { MangaServicesService } from '../../../../services/manga-services.service';

import * as jsonmodel from "../../../../model/JSONmodel";
import { errManga } from '../../../../model/errorManga';

@Component({
  selector: 'app-page-upload',
  templateUrl: './page-upload.component.html',
  styleUrls: ['./page-upload.component.css']
})
export class PageUploadComponent implements OnInit {

  loading:boolean;

  listYear:number[]=[];
  currentYear;

  tags:TagManga[] = [];
  coverErr:string=null;
  nameErr:string=null;
  descriptionErr:string=null;
  tagErr:string = null;


  ngOnInit() {
    this.currentYear = (new Date()).getFullYear();
    let initYear = 1980;
    for (let index = initYear; index <= this.currentYear; index++) {
      this.listYear.push(index);
    }
  }

  /**
   * Search Function
   */
  typing:boolean = false;
  searchTag(searchedString:string):void{
    if(searchedString.length > 1){
      this.typing = true;
      this.mangaservice.searchTagManga(searchedString).pipe(debounceTime(500)).subscribe(
        listFound => {
          this.tags = listFound;
          this.typing = false;
        }
      );
    }else if(searchedString.length <= 1){
      this.tags = [];
    }
  }

  /**
   * Choose suggest tag
   */
  listChoosenTag:TagManga[]=[];
  chooseTag(tagchoose:TagManga, i){
    let notexist = true;
    this.listChoosenTag.forEach(tag => {
      if(tag.id == tagchoose.id) notexist = false;
    });
    if(i >= 0 && notexist){
      this.listChoosenTag.push(tagchoose);
    }
  }

  /**
   * Choose remove tag
   */
  removeChoosenTag(i){
    if(i > -1){
      this.listChoosenTag.splice(i,1);
    }
  }

  /**
   * add alias name Function
   */
  tempAliasName:string ="";
  aliasList:string [] = [];
  aliasConfirm(nameString:string):void{
    if(this.aliasList.length <4){
      if(nameString.length >3 && nameString.length <=50){
        this.aliasList.push(nameString);
        this.tempAliasName = "";
        this.aliastoomany = false;
        this.errorAlias=false;
      }else{
        this.errorAlias=true;
      }
    } else{
      if(nameString.length <= 3) this.errorAlias=true;
      this.aliastoomany = true;
    }
  }
  errorAlias:boolean = false;
  aliastoomany:boolean = false;

  /**
   * Choose remove tag
   */
  removeAliasName(i){
    if(i > -1){
      this.aliasList.splice(i,1);
    }
  }


  /**
   * Upload function
   */
  public formData={
    name:null,
    metaURL: null,
    cover:null,
    releaseYear:(new Date()).getFullYear(),
    description: "",
    totalChap:null,
    information:null,
    status: 1,
    aliasName:null,
    tags:null,
  };

  metaDataGenerator(name:string):string{
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
    let canSubmit = this.handleRequest();
    console.log(canSubmit);
    if(canSubmit){
      console.log('submit!');
      // return this.apiServices.getDataPost('auth/signupauthor',this.formData).subscribe(
      //   Response=> {
      //     this.handleResponce(Response);
      //   },
      //   error=>{
      //     this.handleError(error);
      //   }
      // )
    }else{
      console.log('dit me chung may');
    }
  }

  /**
   * Prepare data (validating)
   */
  handleRequest():boolean{
    let validateInformation = true;
    if(this.formData.name.length <3 || this.formData.name.length >60){
      this.nameErr="Keep name length more than 3 characters and under 60 character ok?"
      validateInformation = false;
    }
    if(this.formData.description.length <3 || this.formData.description.length >300){
      this.descriptionErr="Wah description is limited with at lease 3 characters and maximum 300 characters only!"
      validateInformation = false;
    }
    this.validateImage(this.formData.cover,exists =>{
      if (!exists){
        this.coverErr = "hey, that was not a image!";
        validateInformation = false;
      }
    });
    if(this.listChoosenTag.length <1){
      this.tagErr="You must add at least 1 tag for the manga!";
      validateInformation = false;
    }
    return validateInformation;
  }

  /**
   * Checking whether the URL hat has the image
   * @param url url of online image
   * @param callback boolean true if the url contain the image
   */
  validateImage (url, callback) {
    var img = new Image();
    img.onload = function() { callback(true); };
    img.onerror = function() { callback(false); };
    img.src = url;
  }

  // handleError(error){
  //   this.errors = error.error;
  // }

  handleResponce(data): any {
    this.token.handle(data.access_token);
    this.router.navigateByUrl('/login');
  }

  constructor(
    private apiServices:ApiLaravelService,
    private token:AppTokenService,
    private router:Router,
    private mangaservice:MangaServicesService,
  ) { }

}
