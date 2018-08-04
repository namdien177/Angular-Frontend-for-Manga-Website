import { Component, OnInit } from '@angular/core';
import { MangaServicesService } from '../../services/manga-services.service';
import { ImageManga } from '../../model/manga-img';
import { Manga } from '../../model/manga';
import { Chap } from '../../model/chap';
import { JsonData as JSONchap } from '../../model/JSONchap';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-page-manga-read',
  templateUrl: './page-manga-read.component.html',
  styleUrls: ['./page-manga-read.component.css']
})
export class PageMangaReadComponent implements OnInit {

  constructor(private mangaServices:MangaServicesService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      // console.log(params);                        // log the entire params object
      // console.log(params['id']);                  // log the value of id
      this.idManga = params['id'];
      this.idChap = params['idChap'];
    });
   }

  listImage:ImageManga[]=[];
  idManga:number;
  idChap:number;
  listChap:Chap[]=[];


  ngOnInit() {
    this.getImage(this.idManga,this.idChap);
  }

  getImage(idManga:number, idChap:number){
    this.mangaServices.getMangaChapImage(idManga,idChap).subscribe(
      valua=>{
        //@ts-ignore
        this.listImage = valua.data;
        this.mangaServices.getListMangaChap(idManga).subscribe(
          valua=>{
            //@ts-ignore
            this.listChap.push.apply(this.listChap,valua.data);
          }
        )
      }
    )
  }

}
