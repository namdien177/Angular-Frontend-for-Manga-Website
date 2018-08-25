import { Component, OnInit } from '@angular/core';
import { MangaServicesService } from '../../../../services/manga-services.service';
import { ImageManga } from '../../../../model/manga-img';
import { Chap } from '../../../../model/chap';
import { ActivatedRoute, Router } from '@angular/router'
import { ApiLaravelService } from '../../../../services/api-laravel.service';
import { UserServicesService } from '../../../../services/user-services.service';
import { Bookmark } from '../../../../model/bookmark';
import { AppTokenService } from '../../../../services/app-token.service';

@Component({
  selector: 'app-page-manga-read',
  templateUrl: './page-manga-read.component.html',
  styleUrls: ['./page-manga-read.component.css']
})
export class PageMangaReadComponent implements OnInit {

  constructor(
    private mangaservice:MangaServicesService, 
    private route: ActivatedRoute,
    private api: ApiLaravelService,
    private router: Router,
    private userService: UserServicesService,
    private token: AppTokenService) {
   }

  listImage:ImageManga[]=[];
  idManga:number;
  idChap:number;
  listChap:Chap[]=[];
  prevLink:string = null;
  nextLink:string = null;
  valueID:string = this.idChap+"";
  loading:boolean = true;
  read:boolean = false;
  loginAuth:boolean = false;
  bookmark:boolean = true;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.loading = true;
      this.listImage = [];
      this.listChap = [];
      this.prevLink = null;
      this.nextLink = null;
      this.valueID = params['idChap'];
      this.idManga = params['id'];
      this.idChap = params['idChap'];
      this.getImage(this.idManga,this.idChap);
      this.api.getDataGetResponse('manga/'+this.idManga+"/chap/"+this.idChap+"/link").subscribe(
      res=>{
        //@ts-ignore
        this.prevLink = res.prev;
        //@ts-ignore
        this.nextLink = res.next;
        if(this.token.loggedIn()){
          this.loginAuth = true;
          this.userService.getUserBookmark().subscribe(
            Bookmark =>{
              let didRead = false;
              let didBookmark = false;
              //@ts-ignore
              if(Bookmark.data){
                //@ts-ignore
                Bookmark.data.forEach(manga => {
                  if (manga.idManga == this.idManga){
                    didBookmark = true;
                    if(manga.read == 2){
                      didRead = true;
                    }
                  }
                });
              }
              this.loading = false;
              this.read = didRead;
              this.bookmark = didBookmark;
          });
        }else{
          this.loginAuth = false;
          this.loading = false;
        }
      });
      this.mangaservice.countAView(this.idManga,this.idChap).subscribe(
        res=>{
          //@ts-ignore
          if(res.tokenView){
            //@ts-ignore
            this.token.setTokenRead(res.tokenView);
          }
        }
      );
    });
  }

  markread(){
    this.loading = true;
    this.mangaservice.markReadID(this.idManga).subscribe(
      response => {
        //@ts-ignore
        if(response.boolean){
          this.read = !this.read;
        }
        this.loading = false;
      }
    )
  }

  markunread(){
    this.loading = true;
    this.mangaservice.markUnReadID(this.idManga).subscribe(
      response => {
        //@ts-ignore
        if(response.boolean){
          this.read = !this.read;
        }
        this.loading = false;
      }
    )
  }

  loginBtn(){
    this.router.navigateByUrl('/login');
  }

  prevclick(){
    this.router.navigateByUrl(this.prevLink);
  }

  nextclick(){
    this.router.navigateByUrl(this.nextLink);
  }

  mangaInformation(){
    this.router.navigateByUrl('/manga/'+this.idManga);
  }

  bookmarkBtn(){
    this.loading = true;
    this.mangaservice.bookmark(this.idManga).subscribe(response =>{
      //@ts-ignore
      this.bookmark = response.boolean;
      //@ts-ignore
      this.responseMessage = response.message;
      this.loading = false;
    });
  }

  getImage(idManga:number, idChap:number){
    this.mangaservice.getMangaChapImage(idManga,idChap).subscribe(
      valua=>{
        //@ts-ignore
        this.listImage = valua.data;
        this.mangaservice.getListMangaChap(idManga).subscribe(
          valua=>{
            //@ts-ignore
            this.listChap.push.apply(this.listChap,valua.data);
          }
        )
      }
    )
  }

}
