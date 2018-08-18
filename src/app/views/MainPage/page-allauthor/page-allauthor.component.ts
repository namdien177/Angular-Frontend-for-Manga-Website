import { Component, OnInit } from '@angular/core';
import { ApiLaravelService } from '../../../../services/api-laravel.service';
import * as jsonmodel from '../../../../model/JSONmodel';

@Component({
  selector: 'app-page-allauthor',
  templateUrl: './page-allauthor.component.html',
  styleUrls: ['./page-allauthor.component.css']
})
export class PageAllauthorComponent implements OnInit {

  constructor(
    private apiservice:ApiLaravelService
  ) { }

  authorlist:jsonmodel.AuthorPaginateJSON;
  loadmoreCondition:boolean = false;

  ngOnInit() {
    this.apiservice.getDataGet('author').subscribe(
      response => {
        //@ts-ignore
        this.authorlist = response as jsonmodel.AuthorPaginateJSON;
        if (this.authorlist.links.next != null){
          this.loadmoreCondition = true;
        }else this.loadmoreCondition = false;
      }
    )
  }

}
