import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MangaServicesService } from '../../../../services/manga-services.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppTokenService } from '../../../../services/app-token.service';
import { tempUploadImage, Manga } from '../../../../model/manga';
import { WINDOW } from '../../../WINDOW_PROVIDER';
import { ApiLaravelService } from '../../../../services/api-laravel.service';
import { TagManga } from '../../../../model/tags';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Aliases } from '../../../../model/mangaAlias';

@Component({
  selector: 'app-page-upload-chap',
  templateUrl: './page-upload-chap.component.html',
  styleUrls: ['./page-upload-chap.component.css'],
  // host: {
  //   '(document:click)': 'handleFormClick($event)',
  // },
})
export class PageUploadChapComponent implements OnInit {

  constructor(
    private mangaservices:MangaServicesService,
    private router: Router,
    private token:AppTokenService,
    private route: ActivatedRoute,
    @Inject(WINDOW) private window: Window,
    private apiLara:ApiLaravelService
  ) {
    this.route.params.subscribe(params => {
      this.idManga = params['id'];
      mangaservices.getListMangaChap(this.idManga).subscribe(total=>{
        //@ts-ignore
        this.newestChap = total.meta.total;
      }, err=>{
        this.newestChap = 0;
      });
      mangaservices.getInformation(this.idManga).subscribe(info=>{
        //@ts-ignore
        this.manga = info.data;
      },
      err=>{
        this.router.navigateByUrl('/home');
      })
    });
   }

  ngOnInit() {
    this.loading = true;
    this.mangaservices.isAuthorOfThis(this.idManga).subscribe(res=>{
      //@ts-ignore
      if(!res.boolean){
        this.router.navigateByUrl('/home');
      }
      this.loading = false;
    }, err=>{
      this.router.navigateByUrl('/home');
    });
    this.mangaservices.getTagInfo(this.idManga).subscribe(
      listtag=>{
        //@ts-ignore
        this.listDisplayTag = listtag.data;
        //@ts-ignore
        this.listTagCompare = listtag.data;

        this.formDataUpdate.status = this.manga.status;
        this.formDataUpdate.description = this.manga.description;
        this.formDataUpdate.cover = this.manga.cover;
      }
    );

    this.mangaservices.getTagInfo(this.idManga).subscribe(
      listtag=>{
        //@ts-ignore
        this.listTagCompare = listtag.data;
      }
    );

    this.mangaservices.getAliasOf(this.idManga).subscribe(
      listAlias=>{
        //@ts-ignore
        let listModelAlias:Aliases[] = listAlias.data;
        listModelAlias.forEach(ali=>{
          this.listAliasDisplay.push(ali.name);
          this.listAliasCompare.push(ali.name)
        })
      }
    )
    
  }

  private idManga:number;
  manga:Manga;
  newestChap:number;

  uploadOn:boolean =true;
  editOn:boolean =false;
  updateOn:boolean =false;

  checkImage:boolean = false;
  validImage:boolean = false;

  subChap:boolean = false;
  loading:boolean = false;

  imgOrder:number = 0;
  imgText:string = '';
  listImageTemp:tempUploadImage[] = [];

  onPrev:boolean = false;
  errorDialog:boolean = false;
  errorDialogTitle:string ='';
  errorDialogMessage:string ='';
  redirectModal:boolean = false;


  private formData = {
    idManga: this.idManga,
    chapNumber: this.newestChap+1,
    chapTitle: "",
    chapNumberSecondary: 0,
    listURL: [],
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

  /**
   * UPLOAD CHAP SECTION
   */

  /**
   * 
   * @param closemodal 
   */
  errorModal(closemodal:boolean){
    this.errorDialog = closemodal;
  }

  closePrev(){
    this.onPrev = false;
  }

  removeImage(pos:number){
    if (pos >=0){
      this.listImageTemp.splice(pos, 1);
      this.imgOrder --;
    }
  }

  prevSrc:string = null;
  previewClick(img:tempUploadImage){
    this.prevSrc = img.src;
    this.onPrev = true;
  }

  listeningURLField(value:string){
    this.checkImage = true;
    if(value.length > 3){
      if(this.listImageTemp.length >0){
        this.listImageTemp.forEach(img=>{
          if(this.imgText == img.src){
            this.validImage = false;
            this.checkImage = false;
          }else{
            this.validateImage(value, res=>{
              if(res){
                this.validImage = res;
                this.checkImage = false;
              }else{
                this.validImage = res;
                this.checkImage = false;
              }
            });
          }
        });
      }else{
        this.validateImage(value, res=>{
          if(res){
            this.validImage = res;
            this.checkImage = false;
          }else{
            this.validImage = res;
            this.checkImage = false;
          }
        });
      }
    }else{
      this.checkImage = false;
    }
  }

  oldModification:boolean = false;
  watchChap(event){
    let chap = event.target.value;
    if (chap.length >= String(this.newestChap).length){
      if(Number(chap) <= this.newestChap && Number(chap)>=0){
        this.oldModification=true;
      }
      if(Number(chap)> this.newestChap + 50){
        this.formData.chapNumber = this.newestChap+49;
      }
    }else if(event.keyCode == 189){
      this.formData.chapNumber = this.newestChap;
    }
  }

  onSubmit(){
    this.loading = true;
    if (this.listImageTemp.length > 0){
      this.prepareData();
      console.log(this.formData);
      this.apiLara.getDataPostResponse('content/updateChap',this.formData).subscribe(
        res=>{
          this.loading = false;
          //@ts-ignore
          let response = res.boolean;
          if(response){
            this.errorDialog = response;
            this.errorDialogTitle = 'Successfully';
            //@ts-ignore
            this.errorDialogMessage = res.message;
            this.redirectModal = true;
          }else{
            this.errorDialog = !response;
            this.errorDialogTitle = 'ERROR';
            //@ts-ignore
            this.errorDialogMessage = res.message;
            this.redirectModal = false;
          }
        },err=>{
          //@ts-ignore
          let response = true;
          console.log(err);
          this.loading = false;
          this.errorDialog = response;
          this.errorDialogTitle = 'MAJOR ERROR';
            //@ts-ignore
          this.errorDialogMessage = res.message;
        }
      )
    }else{
      this.loading = false;
      this.errorDialog = true;
      this.errorDialogTitle = 'ERROR';
            //@ts-ignore
      this.errorDialogMessage = 'You need to have image of each chap!';
    }
  }

  prepareData(){
    //prepare listImage
    this.listImageTemp.forEach(src =>{
      this.formData.listURL.push(src);
    });
    this.formData.idManga = this.idManga;
    console.log('prepare finished!')
  }

  clickAddQueue(){
    if(this.imgText.length >0 && this.validImage){
      
      let temp = new tempUploadImage;
      temp.src = this.imgText;
      this.imgOrder ++;
      this.listImageTemp.push(temp);
      this.imgText = '';
      this.validImage = false;
    }
  }

  /**
   * UPDATE SECTION ///////////////////////////////////////////////////////////////////////////////////////////////
   */

  public formDataUpdate={
    idManga:this.idManga,
    cover:null,
    description: "",
    status: 1,

    tagRemove:null,
    tagAdd:null,
    aliasRemove:null,
    aliasAdd:null
  };

  checkCover:boolean = false;
  validCover:boolean = false;

  tempCover:string = '';

  listeningCoverField(value:string){
    this.checkCover = true;
    if(value.length > 3){
      this.validateImage(value, res=>{
        if(res){
          this.validCover = res;
          this.checkCover = false;
        }else{
          this.validCover = res;
          this.checkCover = false;
        }
      });
    }else{
      this.validCover = false;
      this.checkCover = false;
    }
  }

  updateCover(){
    if (this.validCover && !this.checkCover){
      this.formDataUpdate.cover = this.tempCover;
    }
  }

  tagField:string ='';
  tagsSearch:TagManga[] = [];
  countSpace:string[]=[];

  listDisplayTag:TagManga[]=[];
  listTagCompare:TagManga[]=[];
  listNewUpdateTag:TagManga[]=[];          //////////////////////new
  listNewRemoveTag:TagManga[] = [];       //////////////////////new

  completeTag(event){
    let codeKey = event.keyCode;
    if(codeKey == 8 || codeKey == 37 || codeKey == 38 || codeKey == 39 ||codeKey == 40 ) 
    this.countSpace = [];
    if(this.countSpace.indexOf(codeKey)>-1){
      if(this.tagsSearch.length>0){
        this.chooseTag(this.tagsSearch[0],0);
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
  chooseTag(tagchoose:TagManga, i){
    let notexist = true;
    this.listDisplayTag.forEach(tag => {
      if(tag.id == tagchoose.id) notexist = false;
    });
    if(i >= 0 && notexist){
      this.listDisplayTag.push(tagchoose);
      this.tagsSearch = [];
    }
  }

  removeChoosenTag(i, tag:TagManga){
    if(i > -1){
      this.listDisplayTag.splice(i,1);
    }
  }

  /**
   * Search Function
   */
  typing:boolean = false;
  searchTag(searchedString:string):void{
    if(searchedString.trim().length > 1){
      this.typing = true;
      this.mangaservices.searchTagManga(searchedString).pipe(debounceTime(500),distinctUntilChanged()).subscribe(
        listFound => {
          this.tagsSearch = listFound;
          this.typing = false;
        }
      );
    }else if(searchedString.length <= 1){
      this.tagsSearch = [];
    }
  }

  /**
   * add alias name Function
   */
  tempAliasName:string ="";
  errorAlias:boolean = false;
  aliastoomany:boolean = false;

  countSpace2:string[] =[];

  listAliasDisplay:string [] = [];
  listAliasCompare:string[] = [];
  listAliasNew:string[] = [];       //////////////////////new
  listAliasRemove:string[] = [];          //////////////////////new

  aliasfocus:boolean = true;
  aliasConfirm(event):void{
    let codeKey = event.keyCode;
    if(codeKey == 8 || codeKey == 37 || codeKey == 38 || codeKey == 39 ||codeKey == 40 ) 
    this.countSpace2 = [];
    if(this.countSpace2.indexOf(codeKey)>-1){
      let nameString = (event.target.value).trim();
      if(this.listAliasDisplay.length <4){
        if(nameString.length >3 && nameString.length <=50){
          this.listAliasDisplay.push(nameString);
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
  removeAliasName(i, alias:string){
    if(i > -1){
      this.listAliasDisplay.splice(i,1);
    }
  }

  prepareDataUpdate(){
    this.formDataUpdate.idManga = this.idManga;
    //checking changes in tags
    this.listTagCompare.forEach(tagOriginal =>{               //remove tag
      let existTag:boolean = false;
      this.listDisplayTag.every( (tagDisplay, index)=>{
        if(tagOriginal.id == tagDisplay.id){
          existTag = true;
          return false;
        }else{
          existTag = false;
          return true;
        }
      });
      if(!existTag){
        this.listNewRemoveTag.push(tagOriginal);
      }
    });
    this.formDataUpdate.tagRemove = this.listNewRemoveTag;


    this.listDisplayTag.forEach(tagDisplay =>{                  //add new tag
      let existTag:boolean = false;
      this.listTagCompare.every( (tagOriginal, index)=>{
        if(tagOriginal.id == tagDisplay.id){
          existTag = true;
          return false;
        }else{
          return true;
        }
      });
      if(!existTag){
        //tag was new added
        this.listNewUpdateTag.push(tagDisplay);
      }
    });
    this.formDataUpdate.tagAdd = this.listNewUpdateTag;

    //checking changes in alias
    this.listAliasCompare.forEach(aliasOriginal =>{
      if(this.listAliasDisplay.indexOf(aliasOriginal)>-1){
        //still have this alias, then skip
      }else{
        //tag was deleted
        this.listAliasRemove.push(aliasOriginal);
      }
    });
    this.formDataUpdate.aliasRemove = this.listAliasRemove;
    this.listAliasDisplay.forEach(aliasOriginal =>{
      if(this.listAliasCompare.indexOf(aliasOriginal)>-1){
        //still have this tag, then skip
      }else{
        //new tag was added
        this.listAliasNew.push(aliasOriginal);
      }
    });
    this.formDataUpdate.aliasAdd = this.listAliasNew;

    if (this.validCover){
      this.formDataUpdate.cover = this.tempCover;
    }
  }

  onSubmitUpdate(){
    this.loading = true;
    console.log('sub update')
    this.prepareDataUpdate();
    this.mangaservices.updateManga(this.formDataUpdate).subscribe(res=>{
      this.loading=false;
      console.log(res);
    })
  }



  clickUpload(){
    this.uploadOn = true;
    this.editOn = false;
    this.updateOn = false;
  }

  clickEdit(){
    this.uploadOn = false;
    this.editOn = true;
    this.updateOn = false;
  }

  clickUpdate(){
    this.uploadOn = false;
    this.editOn = false;
    this.updateOn = true;
  }
}
