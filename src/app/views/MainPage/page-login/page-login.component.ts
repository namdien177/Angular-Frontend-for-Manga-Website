import { Component, OnInit } from '@angular/core';
import { AppAuthService } from '../../../../services/app-auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.css']
})
export class PageLoginComponent implements OnInit {

  constructor(
    private auth: AppAuthService,
    private router:Router,
  ) { }
  
  load:boolean = true;
  ngOnInit() {
    this.load = false;
  }

  loading(load:boolean){
    if(load==true || load ==false) this.load = load;
  }
}
