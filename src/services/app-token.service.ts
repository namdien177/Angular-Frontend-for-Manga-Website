import { Injectable } from '@angular/core';
import { ApiLaravelService } from './api-laravel.service';

@Injectable({
  providedIn: 'root'
})
export class AppTokenService {

  constructor(
    private apiLaravel:ApiLaravelService
  ) { }

  private iss = {
    login: 'http://127.0.0.1:8000/api/auth/login',
    signupviewer: 'http://127.0.0.1:8000/api/auth/signupviewer',
    signupauthor: 'http://127.0.0.1:8000/api/auth/signupauthor'
  }

  private sub = '6';

  handle(token) {
    this.removeToken();
    this.setToken(token);

  }

  setToken(token){
    localStorage.setItem('token', token);
  }

  setTokenRead(token){
    localStorage.setItem('tokenView',token);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getTokenRead(){
    return localStorage.getItem('tokenView')
  }

  removeToken(){
    localStorage.removeItem('token');
  }

  isValid(){
    const token = this.getToken();
    if(token){
      let payload = this.payLoad(token);
      if (payload){
        let trueHost = Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;
        let AnonymousUser = Object.values(this.sub).indexOf(payload.sub) > -1 ? false : true;
        return (trueHost && AnonymousUser);
      }
    }

    return false;
  }

  getIDUser(){
    const token = this.getToken();
    if(token){
      let payload = this.payLoad(token);
      if (payload){
        if (Object.values(this.iss).indexOf(payload.iss) > -1 || Object.values(this.sub).indexOf(payload.sub) >-1){
          return payload.sub;
        }
      }
    }

    return false;
  }

  payLoad(token:string) {
    let payload =  token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload){
    return JSON.parse(atob(payload))
  }

  loggedIn(){
    if(!this.isValid()){
      this.apiLaravel.getDataPost('anonymous', null).subscribe(
        response => {
          //@ts-ignore
          this.handle(response.anonymous_token)
        },
        error => {
            
        }
      );
    }
    return this.isValid();
  }
}
