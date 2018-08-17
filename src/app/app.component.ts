import { Component, AfterViewInit } from '@angular/core';
import { trigger, state, keyframes, transition, group, query, style, animate } from '@angular/animations';

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
export class AppComponent {

    loading:boolean= true;

    getDepth(outlet) {
    return outlet.activatedRouteData['depth'];
    }
}
