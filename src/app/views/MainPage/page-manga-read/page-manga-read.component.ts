import { Component, OnInit } from '@angular/core';
import { MangaServicesService } from '../../../../services/manga-services.service';
import { ImageManga } from '../../../../model/manga-img';
import { Chap } from '../../../../model/chap';
import { ActivatedRoute, Router } from '@angular/router'
import { ApiLaravelService } from '../../../../services/api-laravel.service';

@Component({
  selector: 'app-page-manga-read',
  templateUrl: './page-manga-read.component.html',
  styleUrls: ['./page-manga-read.component.css']
})
export class PageMangaReadComponent implements OnInit {

  constructor(
    private mangaServices:MangaServicesService, 
    private route: ActivatedRoute,
    private api: ApiLaravelService,
    private router: Router) {
   }

  listImage:ImageManga[]=[];
  idManga:number;
  idChap:number;
  listChap:Chap[]=[];
  prevLink:string = null;
  nextLink:string = null;
  valueID:string = this.idChap+"";
  loading:boolean = true;

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
      this.api.getDataGet('manga/'+this.idManga+"/chap/"+this.idChap+"/link").subscribe(
      res=>{
        //@ts-ignore
        this.prevLink = res.prev;
        //@ts-ignore
        this.nextLink = res.next;
        this.loading = false;
      });
    });
  }

  // clickChap(idManga){
  //   if(idManga){
  //     this.valueID = idManga+"";
  //   }
  // }

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
