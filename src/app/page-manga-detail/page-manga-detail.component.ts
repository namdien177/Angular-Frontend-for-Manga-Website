import { Component, OnInit } from '@angular/core';
import { Manga } from '../../model/manga';
import { MangaServicesService } from '../../services/manga-services.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-manga-detail',
  templateUrl: './page-manga-detail.component.html',
  styleUrls: ['./page-manga-detail.component.css'],

})
export class PageMangaDetailComponent implements OnInit {

  idManga: number;
  showBriefManga: Manga;
  constructor(
    private MangaServices: MangaServicesService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      console.log(params);                        // log the entire params object
      console.log(params['id']);                  // log the value of id
      this.idManga = params['id'];
    });
   }

  ngOnInit() {
    this.MangaServices.getInformation(this.idManga).subscribe(
      (manga) => {
        this.showBriefManga = manga[0];
      }
    );
  }

}
