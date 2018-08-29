import { Component, OnInit, HostListener } from '@angular/core';
import { MangaServicesService } from '../../../../services/manga-services.service';
import * as jsondata from '../../../../model/JSONmodel';
import { Manga } from '../../../../model/manga';
import { ApiLaravelService } from '../../../../services/api-laravel.service';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css']
})
export class PageHomeComponent implements OnInit {

  loading:boolean = true;
  displayList:jsondata.MangaAllJSON[] = [];
  page:number = 1;

  jsonManga:jsondata.MangaJSON;

  ngOnInit() {
    this.loadList(4);
    this.getListRank();
  }
  
  loadList(displayNumber:number): void {
    this.mangaservice.getRecentUpdateList(displayNumber).subscribe(
      listmanga=>{
        // @ts-ignore
        this.jsonManga = listmanga;
        this.getLastestChap(this.jsonManga);
        //@ts-ignore
        this.page = listmanga.meta.current_page;
      }
    )
  }

  getLastestChap(jsonMangaList){
    let tempDisplay:jsondata.MangaAllJSON[] = [];
    jsonMangaList.data.forEach(aManga => {
      this.mangaservice.getMangaAuthor(aManga.id).subscribe(listAuthor=>{
        let unit = new jsondata.MangaAllJSON;
        //@ts-ignore
        unit.aAuthor = listAuthor.data;
        unit.aManga = aManga;
        this.mangaservice.getListMangaChap(aManga.id).subscribe(listChap=>{
          //@ts-ignore
          unit.newestChap = listChap.meta.total;
          tempDisplay.push(unit);
          this.loading = false;
        });
      });
    });
    this.displayList = tempDisplay;
  }

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

  listRank:Manga[] = [];
  getListRank(){
    this.apilara.getDataGet('manga/hottest/10').subscribe(res=>{
      if(res != null){
        //@ts-ignore
        this.listRank = res.data;
      }
    });
  }

  constructor(
    private mangaservice:MangaServicesService,
    private apilara:ApiLaravelService) { }

}
