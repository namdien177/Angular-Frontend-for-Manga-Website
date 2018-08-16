import { Component, OnInit } from '@angular/core';
import { Manga } from '../../../../model/manga';
import { MangaServicesService } from '../../../../services/manga-services.service';
import { TagManga } from '../../../../model/tags';

@Component({
  selector: 'app-page-allmanga',
  templateUrl: './page-allmanga.component.html',
  styleUrls: ['./page-allmanga.component.css']
})
export class PageAllmangaComponent implements OnInit {
  constructor(private mangaService: MangaServicesService) { }

  listAllManga: Manga[];               // array chua manga queue tu sv
  currentDisplayMangaCount = 10;   // so manga dang hien thi
  totalMangaCount = 0;           // tong so manga trong db

  sortname = 1;                    // xac dinh sort theo ten - 1 A-Z === 2 Z-A
  sortview = 2;                    // xac dinh sort theo ten - 1 cao-thap === 2 thap-cao

  showBriefManga: Manga;
  listTagString: TagManga[];
  ngOnInit() {
  }

  getClickedManga(clickedManga: Manga) {
    if (clickedManga) {
      this.showBriefManga = clickedManga;
      this.mangaService.getTagInfo(clickedManga.id).subscribe(value => {
        //@ts-ignore
        this.listTagString = value.data
      });
    }
  }
}
