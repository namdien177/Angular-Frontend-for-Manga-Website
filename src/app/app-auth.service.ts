import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppTokenService } from './app-token.service';

@Injectable({
  providedIn: 'root'
})
export class AppAuthService {

  private loggedIn = new BehaviorSubject<boolean>(this.token.loggedIn());

  authStatus = this.loggedIn.asObservable();

  changeAuthStatus(value:boolean){
    this.loggedIn.next(value)
  }

  constructor(
    private token: AppTokenService,
  ) { }
}
