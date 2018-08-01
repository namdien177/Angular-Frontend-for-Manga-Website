import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Manga } from '../../model/manga';
import { MangaServicesService } from '../../services/manga-services.service';
import {BehaviorSubject, of} from 'rxjs';
import * as _ from 'lodash';
import { JsonData } from '../../model/JSONmanga';
import { JsonData as JsonDataTag } from '../../model/JSONchap';
import {TagManga} from '../../model/tags';
import {catchError, tap} from 'rxjs/operators';
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

  displayList: Manga[];
  newresult: Manga[] ;
  selectedManga: Manga;
  jsonData: JsonData;
  jsonDataTag: JsonDataTag;
  private urlAPIManga = 'http://localhost:8000/api/';

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
          this.displayList.push.apply(this.displayList, ListMangaGot.data);
        }
      );
    } else {
      this.loadmoreCondition = false;
    }
  }

  clickBriefManga(manga: Manga): void {
    this.selectedManga = manga;
    this.outputManga.emit(manga);
  }

  updateMovieServices(): void {
    this.MangaServices.getListManga().subscribe(
      (ListMangaGot) => {
        // @ts-ignore
        this.jsonData = ListMangaGot;
        // @ts-ignore
        this.displayList = ListMangaGot.data;
        console.log(ListMangaGot);
      }
    );
  }

  // showTags(id: number) {
  //   // @ts-ignore
  //   this.MangaServices.getListTagsID(id).subscribe(
  //     listTagID => listTagID
  //   );
  // }

}
