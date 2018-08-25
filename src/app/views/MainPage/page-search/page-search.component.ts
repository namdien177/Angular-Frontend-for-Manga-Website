import { Component, OnInit } from '@angular/core';
import { MangaServicesService } from '../../../../services/manga-services.service';

import * as jsonmodel from '../../../../model/JSONmodel';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-page-search',
  templateUrl: './page-search.component.html',
  styleUrls: ['./page-search.component.css']
})
export class PageSearchComponent implements OnInit {

  constructor(
    private mangaservice:MangaServicesService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.route.queryParams.subscribe(key=>{
      this.searchText = key['name'];
      this.numberSearch = key['result'];
      this.order = key['order'];
      this.condi = key['condi'];
      if(this.searchText == null) this.searchText = '';
      if(this.numberSearch == null) this.numberSearch = 4;
      if(this.order == null) this.order = 'asc';
      if(this.condi == null) this.condi = 0;
    })
  }

  ngOnInit() {
    this.loading = true;
    if(this.searchText != null && this.searchText.length > 1){
      this.searchMangaName();
    }else{
      this.loading = false;
    }
  }

  listMangaDisplay:jsonmodel.MangaAllJSON[] = [];
  searchText:string = '';
  numberSearch:number = 4;
  order = 'asc';
  condi = 0;

  ascName:boolean = true;
  loading:boolean = false;

  processOngoing:boolean = true;
  processFinished:boolean = true;

  moreSearchMangaResult = true;
  private jsonLinkNext:string ='';
  gettingdata:boolean = false;

  searchMangaName(){
    this.loading = true;
    this.gettingdata = true;
    this.mangaservice.searchManga(this.searchText,4,this.order,this.condi).pipe(
      debounceTime(500),distinctUntilChanged()
    )
    .subscribe(
      listFound =>{
        //@ts-ignore
        if(listFound.data == null || listFound.data.length == 0) {
          this.gettingdata = false;
          this.loading = false;
          this.moreSearchMangaResult = false;
        }
        //@ts-ignore
        this.getLastestChap(listFound.data);
        //@ts-ignore
        this.jsonLinkNext = listFound.links.next;
        this.loading = false;
      }
    );
    this.loading = false;
  }

  getLastestChap(jsonMangaList){
    let tempList:jsonmodel.MangaAllJSON[] = [];
    jsonMangaList.forEach(aManga => {
      this.mangaservice.getMangaAuthor(aManga.id).subscribe(listAuthor=>{
        //@ts-ignore
        if(listAuthor.data == null || listAuthor.data.length == 0) {
          this.gettingdata = false;
          this.loading = false;
        }
        let unit = new jsonmodel.MangaAllJSON;
        //@ts-ignore
        unit.aAuthor = listAuthor.data;
        unit.aManga = aManga;
        this.mangaservice.getListMangaChap(aManga.id).subscribe(listChap=>{
          //@ts-ignore
          unit.newestChap = listChap.meta.total;
          tempList.push(unit);
          this.loading = false;
          this.gettingdata = false;
        });
      });
    });
    this.listMangaDisplay = tempList;
  }


  submitSearch(){
    let stringtrimed = this.searchText.trim();
    if(stringtrimed.length > 1){
      this.searchMangaName();
      this.myMethodChangingQueryParams();
    }
    else{
      this.myMethodChangingQueryParams();
      this.listMangaDisplay = [];
    }
  }

  myMethodChangingQueryParams() {

    // Object.assign is used since you apparently 
    // cannot add properties to snapshot query params
    const queryParams: Params = Object.assign({}, this.route.snapshot.queryParams);
  
    // Do something with the params
    queryParams['name'] = this.searchText;
    queryParams['result'] = this.numberSearch;
    queryParams['order'] = this.order;
    queryParams['condi'] = this.condi;
  
    this.router.navigate([], { relativeTo: this.route, queryParams: queryParams });
  
  }

  clickMore(){
    console.log(this.jsonLinkNext)
    if (this.jsonLinkNext == null){
      this.moreSearchMangaResult = false;
    }else{
      this.moreSearchMangaResult = true;
      this.submitSearch();
    }
  }

  clickAll(){
    this.processOngoing = true;
    this.processFinished = true;
    this.condi = 0;
    this.submitSearch();
  }

  clickOngoing(){
    this.processOngoing = true;
    this.processFinished = false;
    this.condi = 1;
    this.submitSearch();
  }

  clickFinished(){
    this.processOngoing = false;
    this.processFinished = true;
    this.condi = 2;
    this.submitSearch();
  }

  clickAscending(){
    this.ascName = false;
    this.order ='desc';
    this.submitSearch();
  }

  clickDescending(){
    this.ascName = true;
    this.order ='asc';
    this.submitSearch();
  }
}
