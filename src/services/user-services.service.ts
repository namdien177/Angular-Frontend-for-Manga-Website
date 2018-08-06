import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {ApiLaravelService} from './api-laravel.service';
import { catchError, tap, map } from 'rxjs/operators';
import { JsonData as UserJSON} from '../model/JSONuser';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {

  urlAPIManga:string = 'http://localhost:8000/api/user'

  constructor(
    private http: HttpClient,
    private apiLaravel: ApiLaravelService
  ) { }

  getUserInfo(id:number):Observable<UserJSON[]>{
    return this.http.get<UserJSON[]>(this.urlAPIManga + '/' + id + ' ').pipe(
      tap(recievedList => recievedList),
      catchError(error => of([

      ])));
  }
}
