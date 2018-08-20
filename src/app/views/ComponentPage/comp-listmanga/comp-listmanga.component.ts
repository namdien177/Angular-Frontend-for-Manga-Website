import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Manga } from '../../../../model/manga';
import { MangaServicesService } from '../../../../services/manga-services.service';
import * as _ from 'lodash';
import * as jsonmodel from '../../../../model/JSONmodel';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-comp-listmanga',
  templateUrl: './comp-listmanga.component.html',
  styleUrls: ['./comp-listmanga.component.css']
})
export class CompListmangaComponent implements OnInit {

  @Input() listMangaHave: Manga[];
  @Input() currentDisplayMangaCount: number;
  @Output() outputManga = new EventEmitter<Manga>();

  selectedManga: Manga;
  jsonData: jsonmodel.MangaJSON;

  listUnit: jsonmodel.MangaAllJSON[] = [];

  loadmoreCondition = true;
  loading:boolean = true;

  constructor(
    private MangaServices: MangaServicesService) { }

  ngOnInit() {
    this.updateMovieServices();
  }

  showMoreResult() {
    this.loading = true;
    if (this.jsonData.links.next) {
      this.MangaServices.getListManga(this.jsonData.links.next).subscribe(
        (ListMangaGot) => {
          // @ts-ignore
          this.jsonData = ListMangaGot;
          // @ts-ignore
          this.getAuthorNameAndNewChap(ListMangaGot);
        }
      );
    } else {
      this.loadmoreCondition = false;
      this.loading = false;
    }
  }

  clickBriefManga(unit: jsonmodel.MangaAllJSON): void {
    this.selectedManga = unit.aManga;
    this.outputManga.emit(unit.aManga);
  }

  updateMovieServices(): void {
    this.MangaServices.getListManga().subscribe(
      (ListMangaGot) => {
        // @ts-ignore
        this.jsonData = ListMangaGot;
        // @ts-ignore
        this.getAuthorNameAndNewChap(ListMangaGot);
      }
    );
  }

  getAuthorNameAndNewChap(listManga:jsonmodel.MangaJSON){
    listManga.data.forEach(aManga=>{
      this.MangaServices.getMangaAuthor(aManga.id).subscribe(listAuthor=>{
        let unit = new jsonmodel.MangaAllJSON;
        //@ts-ignore
        unit.aAuthor = listAuthor.data;
        unit.aManga = aManga;
        this.MangaServices.getListMangaChap(aManga.id).subscribe(listChap=>{
          //@ts-ignore
          this.MangaServices.getListMangaChap(aManga.id, listChap.links.last).subscribe(listChap=>{
            //@ts-ignore
            unit.newestChap = listChap.data[listChap.data.length -1].chap;
            this.listUnit.push(unit);
            this.loading = false;
          });
        });
      });
    });
  }

  // showTags(id: number) {newestChap
  //   // @ts-ignore
  //   this.MangaServices.getListTagsID(id).subscribe(
  //     listTagID => listTagID
  //   );
  // }

}
