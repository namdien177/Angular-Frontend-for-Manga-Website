import { Component, OnInit } from '@angular/core';
import { Manga } from '../../../../model/manga';
import { MangaServicesService } from '../../../../services/manga-services.service';
import { ApiLaravelService } from '../../../../services/api-laravel.service';
import { AppTokenService } from '../../../../services/app-token.service';
import { Author } from '../../../../model/author';
import { ActivatedRoute, Router } from '@angular/router';
import * as jsondata from '../../../../model/JSONmodel';

@Component({
  selector: 'app-page-author',
  templateUrl: './page-author.component.html',
  styleUrls: ['./page-author.component.css']
})
export class PageAuthorComponent implements OnInit {

  constructor(
    private mangaservice: MangaServicesService,
    private apiservice: ApiLaravelService,
    private token: AppTokenService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe(params => {
      this.authorID = params['id'];
    });
  }

  displayList: jsondata.MangaAllJSON[] = [];
  jsonMangaList: jsondata.MangaJSON;
  loadmorerecent: boolean = true;
  author: Author;
  authorID;
  loading: boolean = true;
  error: boolean = true;
  userID = this.token.getIDUser();

  getLastestChap(jsonMangaList) {
    if (jsonMangaList) {
      jsonMangaList.data.forEach(aManga => {
        let unit = new jsondata.MangaAllJSON;
        unit.aAuthor = [];
        unit.aAuthor.push(this.author);
        unit.aManga = aManga;
        this.mangaservice.getListMangaChap(aManga.id).subscribe(listChap => {
          //@ts-ignore
          unit.newestChap = listChap.meta.total;
          this.displayList.push(unit);
        });
      });
    }
    this.loading = false;
  }

  loadmoreall() {
    if (this.jsonMangaList.links.next) {
      this.getMangaOfAuthor(this.jsonMangaList.links.next);
    } else {
      this.loadmorerecent = false;
    }
  }

  uploadbtn() {
    this.router.navigateByUrl('/upload');
  }

  getMangaOfAuthor(link?) {
    if (!link) {
      this.mangaservice.getListMangaAuthor(this.authorID).subscribe(
        mangalist => {
          //@ts-ignore
          this.jsonMangaList = mangalist;
          this.getLastestChap(mangalist);
        }
      );
    } else {
      this.mangaservice.getListMangaAuthor(this.authorID, link).subscribe(
        mangalist => {
          //@ts-ignore
          this.jsonMangaList = mangalist;
          this.getLastestChap(mangalist);
        }
      );
    }

  }

  ngOnInit() {
    this.mangaservice.getAuthor(this.authorID).subscribe(
      author => {
        //@ts-ignore
        this.author = author.data;
        //@ts-ignore
        if (author.data) {
          this.error = false;
          this.getMangaOfAuthor();
        } else {
          this.error = true;
          this.loading = false;
        }
      }
    )
  }

}
