import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppTokenService } from './app-token.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppBeforeloginService implements CanActivate {

  constructor(
    private token: AppTokenService,

  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot ):boolean | Observable<boolean> | Promise<boolean> {
    return !this.token.loggedIn();
  }
}
