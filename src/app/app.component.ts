import { Component, AfterViewInit, OnInit } from '@angular/core';
import { trigger, state, keyframes, transition, group, query, style, animate } from '@angular/animations';
import { AppTokenService } from '../services/app-token.service';
import { ApiLaravelService } from '../services/api-laravel.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
      trigger('animationLoadPage',[

        state('small',style({
            transform: 'scale(1)',
        })),
        state('big',style({
            transform: 'scale(1.5)',
        })),

        transition('small => big', animate('300ms ease-in')),

      ])
  ]
})
export class AppComponent implements OnInit {
    ngOnInit() {
    }

    loading:boolean= true;

    getDepth(outlet) {
    return outlet.activatedRouteData['depth'];
    }

    constructor(
        private token:AppTokenService,
        private apiLaravel:ApiLaravelService
    ){}
}
