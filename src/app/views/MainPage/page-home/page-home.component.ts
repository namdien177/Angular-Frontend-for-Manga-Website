import { Component, OnInit, HostListener } from '@angular/core';
import { MangaServicesService } from '../../../../services/manga-services.service';
import * as jsondata from '../../../../model/JSONmodel';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css']
})
export class PageHomeComponent implements OnInit {

  loading:boolean = true;
  displayList:jsondata.MangaAllJSON[] = [];

  jsonManga:jsondata.MangaJSON;

  ngOnInit() {
    this.loadList(4);
  }
  
  loadList(displayNumber:number): void {
    this.mangaservice.getRecentUpdateList(displayNumber).subscribe(
      listmanga=>{
        // @ts-ignore
        this.jsonManga = listmanga;
        this.getLastestChap(this.jsonManga);
      }
    )
  }

  getLastestChap(jsonMangaList){
    jsonMangaList.data.forEach(aManga => {
      this.mangaservice.getMangaAuthor(aManga.id).subscribe(listAuthor=>{
        let unit = new jsondata.MangaAllJSON;
        //@ts-ignore
        unit.aAuthor = listAuthor.data;
        unit.aManga = aManga;
        this.mangaservice.getListMangaChap(aManga.id).subscribe(listChap=>{
          //@ts-ignore
          this.mangaservice.getListMangaChap(aManga.id, listChap.links.last).subscribe(listChap=>{
            //@ts-ignore  
            unit.newestChap = listChap.data[listChap.data.length -1].chap;
          });
          this.displayList.push(unit);
          this.loading = false;
        });
    });
  })}

  nextcondition = true;
  nextbtn() {
    if (this.jsonManga.links.next) {
      this.mangaservice.getRecentUpdateList(4,this.jsonManga.links.next).subscribe(
        (ListMangaGot) => {
          // @ts-ignore
          this.jsonManga = ListMangaGot;

          this.getLastestChap(ListMangaGot);
        }
      );
      if(this.jsonManga.links.next){
        this.nextcondition = true;
      }else{
        this.nextcondition = false;
      }
    } else {
      this.nextcondition = false;
    }
  }

  prevcondition = false;
  prevbtn() {
    if (this.jsonManga.links.prev) {
      this.mangaservice.getRecentUpdateList(4, this.jsonManga.links.prev).subscribe(
        (ListMangaGot) => {
          // @ts-ignore
          this.jsonManga = ListMangaGot;
          this.getLastestChap(ListMangaGot);
        }
      );
      if(this.jsonManga.links.prev){
        this.prevcondition = true;
      }else{
        this.prevcondition = false;
      }
    } else {
      this.prevcondition = true;
    }
  }

  constructor(
    private mangaservice:MangaServicesService) { }

}
