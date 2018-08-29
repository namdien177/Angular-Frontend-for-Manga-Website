import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

@Component({
  selector: 'app-page-upload',
  templateUrl: './page-upload.component.html',
  styleUrls: ['./page-upload.component.css']
})

export class PageUploadComponent implements OnInit {

  loading:boolean = true;

  listYear:number[]=[];
  currentYear;

  tags:TagManga[] = [];
  coverErr:string=null;
  nameErr:string=null;
  descriptionErr:string=null;
  tagErr:string = null;

  countSpace:string[]=[];
  countSpace2:string[] =[];

  idAuthor:number = null;
  
  modalMessage='Back to Author page'

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
      this.mangaservice.searchTagManga(searchedString).pipe(debounceTime(500),distinctUntilChanged()).subscribe(
        listFound => {
          this.tags = listFound;
          this.typing = false;
        }
      );
    }else if(searchedString.length <= 1){
      this.tags = [];
    }
  }


  tagField:string ='';
  completeTag(event){
    let codeKey = event.keyCode;
    if(codeKey == 8 || codeKey == 37 || codeKey == 38 || codeKey == 39 ||codeKey == 40 ) 
    this.countSpace = [];
    if(this.countSpace.indexOf(codeKey)>-1){
      if(this.tags.length>0){
        this.chooseTag(this.tags[0],0);
        this.tagField = '';
      }
      this.countSpace = [];
    }else{
      if(codeKey == 32) this.countSpace.push(codeKey);
      else this.countSpace = [];
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
      this.tags = [];
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
  errorAlias:boolean = false;
  aliastoomany:boolean = false;

  aliasfocus:boolean = true;
  aliasConfirm(event):void{
    let codeKey = event.keyCode;
    if(codeKey == 8 || codeKey == 37 || codeKey == 38 || codeKey == 39 ||codeKey == 40 ) 
    this.countSpace2 = [];
    if(this.countSpace2.indexOf(codeKey)>-1){
      let nameString = event.target.value;
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
      this.countSpace2 = [];
    }else{
      if(codeKey == 32) this.countSpace2.push(codeKey);
      else this.countSpace2 = [];
    }
  }

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
    status: 1,
    aliasName:null,
    tags:null,
    author:this.token.getIDUser()
  };

  metaDataGenerator(name:string):string{
    name = name.toLocaleLowerCase();
    if(name.length>0){
      let split = name.split(' ');
      let meta:string ="";
      split.forEach(str=>{
        meta=meta+str+"-";
      });
      return meta.substring(0,meta.length-1);
    }
  }

  prepareForm(){
    this.formData.metaURL = this.metaDataGenerator(this.formData.name);
    this.formData.aliasName = this.aliasList;
    this.formData.tags = this.listChoosenTag;
  }

  errorDialog:boolean=false;
  errorDialogMessage:string='';
  errorDialogTitle:string = '';

  errorModal(closemodal:boolean){
    this.errorDialog = closemodal;
  }

  submitDone:boolean = false;
  onSubmit(){
    this.loading = true;
    this.validateRequest();
    this.validateImage(this.formData.cover, boolean=>{
      this.toSubmit = boolean;
      if (!boolean){
        this.coverErr = 'Opps...that was not an image?';
        this.errorDialogTitle='ERROR !!!'
        this.errorDialog = true;
        this.errorDialogMessage = 'The action cannot be done! Can you review all the fields to the correct format? :(';
        this.loading = false;
      }else{
        this.prepareForm();
        this.mangaservice.uploadManga(this.formData).subscribe(
          res => {
            this.loading = false;
            //@ts-ignore
            if(res.boolean){
              this.errorDialogTitle = 'Success!'
              this.errorDialog = true;
              //@ts-ignore
              this.errorDialogMessage = res.message;
              this.submitDone = true;
            }else{
              this.errorDialogTitle ='Opps!!!'
              this.errorDialog = true;
              this.errorDialogMessage = 'There was some bugs on our system...I know it\'s troublesome but please try again after awhile :(';
            }
          }
        );
      }
    });
  }

  toProfile(opt:boolean){
    if(opt){
      this.errorDialog = false;
      this.router.navigateByUrl('/author/'+this.idAuthor);
    }
  }

  /**
   * Prepare data (validating)
   */
  toSubmit:boolean = true;
  validateRequest(){
    if(this.formData.name.length <3 || this.formData.name.length >200){
      this.nameErr="Keep name length more than 3 characters and under 200 character ok?"
      this.errorDialogTitle ='Opps!!!'
      this.errorDialog = true;
      this.errorDialogMessage = 'Some input was in wrong format! Please recheck all field again!';
      this.toSubmit = false
    }
    if(this.formData.description.length <3 || this.formData.description.length >400){
      this.descriptionErr="Wah description is limited with at lease 3 characters and maximum 300 characters only!"
      this.toSubmit = false;
      this.errorDialogTitle ='Opps!!!'
      this.errorDialog = true;
      this.errorDialogMessage = 'Some input was in wrong format! Please recheck all field again!';
    }
    if(this.listChoosenTag.length <1){
      this.tagErr="You must add at least 1 tag for the manga!";
      this.toSubmit = false;
      this.errorDialogTitle ='Opps!!!'
      this.errorDialog = true;
      this.errorDialogMessage = 'Some input was in wrong format! Please recheck all field again!';
    }
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

  handleResponce(data): any {
    this.token.handle(data.access_token);
    this.router.navigateByUrl('/login');
  }

  constructor(
    private apiServices:ApiLaravelService,
    private token:AppTokenService,
    private router:Router,
    private mangaservice:MangaServicesService,
  ) {
    if(this.token.getIDUser() == false){
      this.router.navigateByUrl('/home');
    }
    let formData = {
      id: this.token.getIDUser()
    }
    this.apiServices.getDataPost('author',formData).subscribe(
      res =>{
        //@ts-ignore
        this.idAuthor = res.id
        this.loading = false;
        if (this.idAuthor <=0){
          this.router.navigateByUrl('/home');
        }
      }
    );
   }

}
