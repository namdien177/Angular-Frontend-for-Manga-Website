import { Component, OnInit } from '@angular/core';
import { Manga } from '../../../../model/manga';
import { MangaServicesService } from '../../../../services/manga-services.service';
import { ActivatedRoute } from '@angular/router';
import { TagManga } from '../../../../model/tags';
import { Chap } from '../../../../model/chap';
import * as jsonmodel from '../../../../model/JSONmodel';
import { UserServicesService } from '../../../../services/user-services.service';
import { AppTokenService } from '../../../../services/app-token.service';
import { ApiLaravelService } from '../../../../services/api-laravel.service';

@Component({
  selector: 'app-page-manga-detail',
  templateUrl: './page-manga-detail.component.html',
  styleUrls: ['./page-manga-detail.component.css'],

})
export class PageMangaDetailComponent implements OnInit {

  idManga: number;
  showBriefManga: Manga;
  tagList: TagManga[] = [];
  chapList:Chap[] = [];
  loadmoreCondition = true;
  jsonData:jsonmodel.ChapJSON;
  read=false;
  responseMessage:string;
  auth:boolean = false;
  loading: boolean = true;

  constructor(
    private MangaServices: MangaServicesService,
    private userService: UserServicesService,
    private apiNormal: ApiLaravelService,
    private route: ActivatedRoute,
    private token: AppTokenService
  ) {
    this.route.params.subscribe(params => {
      this.idManga = params['id'];
    });
   }

   showMoreResult() {
     this.loading = true;
     console.log(this.jsonData);
      if (this.jsonData.links.next) {
        this.MangaServices.getListMangaChap(this.showBriefManga.id, this.jsonData.links.next).subscribe(
          (ListMangaChapGot) => {
            // @ts-ignore
            this.jsonData = ListMangaChapGot;
            // @ts-ignore
            this.chapList.push.apply(this.chapList, ListMangaChapGot.data);
            this.loading = false;
          }
        );
      } else {
        this.loadmoreCondition = false;
        this.loading = false;
      }
    }

  ngOnInit() {
    this.MangaServices.getInformation(this.idManga).subscribe(
      (manga) => {
        //@ts-ignore
        this.showBriefManga = manga.data;
      }
    );
    this.MangaServices.getTagInfo(this.idManga).subscribe(data=>
      {
        //@ts-ignore
        this.tagList= data.data;
      });
    this.MangaServices.getListMangaChap(this.idManga).subscribe(
      chaplist => {
        //@ts-ignore
        this.chapList = chaplist.data;
        //@ts-ignore
        this.jsonData = chaplist;
        this.userService.getUserBookmark().subscribe(
          Bookmark =>{
            let didRead = false;
            //@ts-ignore
            if(Bookmark.data){
              //@ts-ignore
              Bookmark.data.forEach(manga => {
                if (manga.idManga == this.showBriefManga.id){
                  didRead = true;
                }
              });
            }
            this.loading = false;
            this.read = didRead;
        });
      }
    );
    this.auth = this.token.loggedIn();
  }

  bookmark(manga:Manga):void{
    this.loading = true;
    this.MangaServices.bookmark(manga).subscribe(response =>{
      console.log(response);
      //@ts-ignore
      this.read = response.boolean;
      //@ts-ignore
      this.responseMessage = response.message;
      this.loading = false;
    });
  }

  unbookmark(manga:Manga){
    this.loading = true;
    this.MangaServices.unbookmark(manga).subscribe(response =>{
      console.log(response);
      //@ts-ignore
      this.read = !response.boolean;
      //@ts-ignore
      this.responseMessage = response.message;
      this.loading = false;
    });
  }
}
