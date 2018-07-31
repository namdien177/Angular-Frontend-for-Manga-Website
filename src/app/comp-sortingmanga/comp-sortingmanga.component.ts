import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comp-sortingmanga',
  templateUrl: './comp-sortingmanga.component.html',
  styleUrls: ['./comp-sortingmanga.component.css']
})
export class CompSortingmangaComponent implements OnInit {

  @Input() totalMangaCount:number;

  constructor() { }

  ngOnInit() {
  }

  @Input() sortname:number;
  sortnamebtn(luachon:string):void{
    if (luachon == 'tangdan'){
      this.sortname = 1;
    }else{
      this.sortname = 2;
    }
  }

  @Input() sortview:number;
  sortviewbtn(luachon:string):void{
    if (luachon == 'tangdan'){
      this.sortview = 1;
    }else{
      this.sortview = 2;
    }
  }

}
