import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {ApiLaravelService} from './api-laravel.service';
import { catchError, tap, map } from 'rxjs/operators';
import * as jsonmodel from '../model/JSONmodel';
import { Observable, of } from 'rxjs';
import { AppTokenService } from './app-token.service';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {

  urlAPIManga:string = 'http://localhost:8000/api/user'

  constructor(
    private http: HttpClient,
    private apiLaravel: ApiLaravelService,
    private token: AppTokenService
  ) { }

  getUserInfo(id:number):Observable<jsonmodel.UserJSON[]>{
    return this.http.get<jsonmodel.UserJSON[]>(this.urlAPIManga + '/' + id + ' ').pipe(
      tap(recievedList => recievedList),
      catchError(error => of([

      ])));
  }

  getUserBookmark():Observable<jsonmodel.BookmarkJSON[]>{
    return this.http.get<jsonmodel.BookmarkJSON[]>(this.urlAPIManga + '/' + this.token.getIDUser() + '/bookmark ').pipe(
      tap(recievedList => recievedList),
      catchError(error => of([

      ])));
  }
}
