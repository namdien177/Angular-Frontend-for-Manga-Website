import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { AppAuthService } from '../../../../services/app-auth.service';
import { AppTokenService } from '../../../../services/app-token.service';
import { Router } from '@angular/router';
import { MangaServicesService } from '../../../../services/manga-services.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Manga } from '../../../../model/manga';
import { WINDOW } from '../../../WINDOW_PROVIDER';

@Component({
  selector: 'app-comp-navigationbar',
  templateUrl: './comp-navigationbar.component.html',
  styleUrls: ['./comp-navigationbar.component.css'],
  host: {
    '(document:click)': 'handleFormClick($event)',
  },
})
export class CompNavigationbarComponent implements OnInit {

  public loggedIn:boolean;
  resultBar:boolean = false;

  constructor(
    private auth:AppAuthService,
    private token: AppTokenService,
    private router: Router,
    private mangaService: MangaServicesService,
    @Inject(WINDOW) private window: Window
  ) { }

  logOut(event:MouseEvent){
    event.preventDefault();
    this.auth.changeAuthStatus(false);
    this.token.removeToken();
    this.router.navigateByUrl('/');
  }

  @ViewChild('searchForm') elementRef:ElementRef;

  handleFormClick($event){
    if (this.elementRef.nativeElement.contains(event.target)) {
      
    } else {
      this.resultBar = false;
    }
  }

  clickLink(){
    this.resultBar = false;
  }

  listFound:Manga[] = [];
  searchBarText:string = '';
  notfound:boolean = true;
  searchPress(){
    if(this.searchBarText.trim().length >1){
      this.resultBar = true;
      this.notfound = false;
      let stringsearch = this.searchBarText.trim();
      this.mangaService.searchManga(stringsearch,3).pipe(
        debounceTime(500),distinctUntilChanged()
      ).subscribe(
        listmanga => {
          //@ts-ignore
          this.listFound = listmanga.data;
          if(this.listFound.length >0) this.notfound = false;
          else this.notfound = true;
        }
      )
    }else{
      this.resultBar = false;
      this.notfound = true;
    }
  }

  ngOnInit() {
    if(this.token.isValid()){
      this.auth.changeAuthStatus(true);
    }
    this.auth.authStatus.subscribe(
      authCondition => this.loggedIn = authCondition
    );
  }

}
