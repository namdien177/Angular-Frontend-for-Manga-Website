import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs'
import { AppTokenService } from './app-token.service';

@Injectable({
  providedIn: 'root'
})
export class AppAffterloginService implements CanActivate{

  constructor(
    private token: AppTokenService,

  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot ):boolean | Observable<boolean> | Promise<boolean> {
    return this.token.loggedIn();
  }
}
