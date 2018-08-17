import { Component, OnInit } from '@angular/core';
import { AppAuthService } from '../../../../services/app-auth.service';
import { Router } from '@angular/router';
import { AppTokenService } from '../../../../services/app-token.service';
import { ApiLaravelService } from '../../../../services/api-laravel.service';
import { UserServicesService } from '../../../../services/user-services.service';
import { User } from '../../../../model/user';
import * as jsonmodel from '../../../../model/JSONmodel';
import { Bookmark, displayBookmark } from '../../../../model/bookmark';
import { MangaServicesService } from '../../../../services/manga-services.service';
import { Manga } from '../../../../model/manga';

@Component({
  selector: 'app-page-user',
  templateUrl: './page-user.component.html',
  styleUrls: ['./page-user.component.css']
})
export class PageUserComponent implements OnInit {

  public loggedIn:boolean = false;
  user:User;
  listmanga:displayBookmark[] = [];

  unbookmark(manga:Manga, i){
    console.log (manga);
    this.mangaservice.unbookmark(manga).subscribe(response =>{
      console.log(response);
      //@ts-ignore
      if (response.boolean){
        if (i > -1) {
          this.listmanga.splice(i, 1);
        }
      }
    });
  }

  constructor(
    private auth:AppAuthService,
    private router: Router,
    private token: AppTokenService,
    private apiLaravel: ApiLaravelService,
    private userServices: UserServicesService,
    private mangaservice: MangaServicesService
  ) {}

  ngOnInit() {
    this.auth.authStatus.subscribe(
      authCondition => {
        this.loggedIn = authCondition;
        if (!this.loggedIn){
          this.router.navigateByUrl('/');
        }else{
          this.userServices.getUserInfo(this.token.getIDUser()).subscribe(
            userInfo =>{
              //@ts-ignore
              this.user = userInfo.data;
              this.userServices.getUserBookmark().subscribe(
                listmanga=>{
                  //@ts-ignore
                  let tempList:Bookmark[] = listmanga.data;
                  tempList.forEach(Bookmark=>{
                    this.mangaservice.getInformation(Bookmark.idManga).subscribe(
                      jsoninfo=>{
                        //@ts-ignore
                        let infoManga:Manga = jsoninfo.data;
                        this.mangaservice.getListMangaChap(Bookmark.idManga).subscribe(listChap=>{
                          //@ts-ignore
                          this.mangaservice.getListMangaChap(Bookmark.idManga, listChap.links.last).subscribe(listChap=>{
                            //@ts-ignore
                            let latestChap:number = listChap.data[listChap.data.length -1].chap;
                            let displayManga:displayBookmark = {
                              manga: Bookmark,
                              latestChap:latestChap,
                              info: infoManga
                            };
                            this.listmanga.push(displayManga);
                          });
                        });
                      }
                    );
                  })
                }
              ) 
            }
          );
        }
      }
    );

  }

}
