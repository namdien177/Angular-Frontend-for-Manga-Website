import { Component, OnInit } from '@angular/core';
import { MangaServicesService } from '../../../../services/manga-services.service';
import { ApiLaravelService } from '../../../../services/api-laravel.service';
import { AppTokenService } from '../../../../services/app-token.service';
import { Manga } from '../../../../model/manga';
import { TagManga } from '../../../../model/tags';
import { Aliases } from '../../../../model/mangaAlias';
import { UserServicesService } from '../../../../services/user-services.service';
import { User } from '../../../../model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    private mangaservices:MangaServicesService,
    private apiLara:ApiLaravelService,
    private tokenservices:AppTokenService,
    private userservices: UserServicesService,
    private router:Router
  ) { 
    this.userservices.me().subscribe(user=>{
      //@ts-ignore
      this.user = user;
      if (this.user.authorize != -1){
        router.navigateByUrl('/home');
      }
    });
  }

  ngOnInit() {
    this.loading = true;
    this.apiLara.getDataPost('admin/statsuser',this.toServer)
    .subscribe(res=>{
      if (res != null){
        //@ts-ignore
        this.userInfo.total = res.total;
        //@ts-ignore
        this.userInfo.author = res.author;
      }
    });
    this.apiLara.getDataPost('admin/newManga',this.toServer)
    .subscribe(res =>{
      if(res != null){
        //@ts-ignore
        this.listNeedAuthorize = res.data;
        //@ts-ignore
        this.nextAuthorize = res.links.next;
      }
      this.loading = false;
    });
    this.apiLara.getDataGet('manga/hottest/10').subscribe(res=>{
      if(res != null){
        //@ts-ignore
        this.listHot = res.data;
      }
    });
  }

  private user:User = null;

  private userInfo ={
    total:0,
    author:0,
  }

  private toServer = {
    id: this.tokenservices.getIDUser()
  }

  loading:boolean = false;

  listHot:Manga[] = [];
  listNeedAuthorize:Manga[] = [];
  nextAuthorize:string =null;

  clickAuthorize(manga:Manga){
    if (manga != null){
      this.loading = true;
      let dataAuthorize={
        id: this.toServer.id,
        idManga: manga.id
      }
      this.apiLara.getDataPostResponse('admin/authorizeManga',dataAuthorize).subscribe(
        res=>{
          console.log(res);
          //@ts-ignore
          if(res.boolean){
            this.apiLara.getDataPost('admin/newManga',this.toServer)
            .subscribe(res =>{
              if(res != null){
                //@ts-ignore
                this.listNeedAuthorize = res.data;
                //@ts-ignore
                this.nextAuthorize = res.links.next;
              }
              this.loading= false;
            });
          }
        }
      )
    }
  }

  previewWindows:boolean = false;
  previewManga:Manga = null;

  tagPreview:TagManga[] = [];
  aliasPreview:string[] = [];

  clickPreview(manga: Manga){
    if(manga != null){
      this.loading = true;
      this.previewWindows = true;
      this.previewManga = manga;
      this.mangaservices.getAliasOf(manga.id).subscribe(
        listAlias =>{
          //@ts-ignore
          let listModelAlias:Aliases[] = listAlias.data;
          listModelAlias.forEach(ali=>{
            this.aliasPreview.push(ali.name);
          });
          this.loading = false;
        }
      );
      this.mangaservices.getTagInfo(manga.id).subscribe(
        listtag=>{
          //@ts-ignore
          this.tagPreview = listtag.data;
        }
      );
    }else{
      this.previewWindows = false;
    }
  }

  clickClosePreview(){
    this.previewWindows = false;
    this.previewManga = null;
    this.tagPreview = [];
    this.aliasPreview = [];
  }

  clickDelete(manga:Manga){

  }

  listDisabledManga:Manga[] = [];

}
