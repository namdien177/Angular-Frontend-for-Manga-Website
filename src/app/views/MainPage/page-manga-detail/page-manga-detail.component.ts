import { Component, OnInit } from '@angular/core';
import { Manga } from '../../../../model/manga';
import { MangaServicesService } from '../../../../services/manga-services.service';
import { ActivatedRoute } from '@angular/router';
import { TagManga } from '../../../../model/tags';
import { Chap } from '../../../../model/chap';
import { JsonData } from '../../../../model/JSONchap';

@Component({
  selector: 'app-page-manga-detail',
  templateUrl: './page-manga-detail.component.html',
  styleUrls: ['./page-manga-detail.component.css'],

})
export class PageMangaDetailComponent implements OnInit {

  idManga: number;
  showBriefManga: Manga;
  tagList: TagManga[] = [];
  chapList:Chap[]=[];
  loadmoreCondition = true;
  jsonData:JsonData;

  constructor(
    private MangaServices: MangaServicesService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      // console.log(params);                        // log the entire params object
      // console.log(params['id']);                  // log the value of id
      this.idManga = params['id'];
    });
   }

   showMoreResult() {
     console.log(this.jsonData);
    if (this.jsonData.links.next) {
      this.MangaServices.getListMangaChap(this.showBriefManga.id, this.jsonData.links.next).subscribe(
        (ListMangaChapGot) => {
          // @ts-ignore
          this.jsonData = ListMangaChapGot;
          // @ts-ignore
          this.chapList.push.apply(this.chapList, ListMangaChapGot.data);
        }
      );
    } else {
      this.loadmoreCondition = false;
    }
    console.log(this.loadmoreCondition);
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
        }
      );
  }

}
