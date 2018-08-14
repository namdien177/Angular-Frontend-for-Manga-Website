import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Manga } from '../../../../model/manga';
import { MangaServicesService } from '../../../../services/manga-services.service';
import {BehaviorSubject, of} from 'rxjs';
import * as _ from 'lodash';
import { JsonData, UnitManga } from '../../../../model/JSONmanga';
import { JsonData as JsonDataTag } from '../../../../model/JSONchap';
import {TagManga} from '../../../../model/tags';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import { Author } from '../../../../model/author';

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
  jsonData: JsonData;

  listUnit: UnitManga[] = [];

  loadmoreCondition = true;

  constructor(
    private MangaServices: MangaServicesService,
    private http: HttpClient) { }

  ngOnInit() {
    this.updateMovieServices();
  }

  showMoreResult() {
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
    }
  }

  clickBriefManga(unit: UnitManga): void {
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

  getAuthorNameAndNewChap(listManga:JsonData){
    listManga.data.forEach(aManga=>{
      this.MangaServices.getAuthor(aManga.id).subscribe(listAuthor=>{
        let unit = new UnitManga;
        //@ts-ignore
        unit.aAuthor = listAuthor.data;
        unit.aManga = aManga;
        
        this.MangaServices.getListMangaChap(aManga.id).subscribe(listChap=>{
          //@ts-ignore
          this.MangaServices.getListMangaChap(aManga.id, listChap.links.last).subscribe(listChap=>{
            //@ts-ignore
            unit.newestChap = listChap.data[listChap.data.length -1].chap;
            // //@ts-ignore
            // console.log(listChap.data[listChap.data.length -1]);
          });
        });

        this.listUnit.push(unit);
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
