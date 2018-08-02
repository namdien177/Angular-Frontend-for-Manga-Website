import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppTokenService {

  constructor() { }

  private iss = {
    login: 'http://127.0.0.1:8000/api/auth/login',
    signupviewer: 'http://127.0.0.1:8000/api/auth/signupviewer',
    signupauthor: 'http://127.0.0.1:8000/api/auth/signupauthor'
  }

  handle(token) {
    this.setToken(token);

  }

  setToken(token){
    localStorage.setItem('token', token);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  removeToken(){
    localStorage.removeItem('token');
  }

  isValid(){
    const token = this.getToken();
    if(token){
      let payload = this.payLoad(token);
      if (payload){
        return (Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false);
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
    return this.isValid();
  }
}
