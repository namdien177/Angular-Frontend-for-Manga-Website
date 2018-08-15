import { Injectable } from '@angular/core';
import { Manga } from '../model/manga';
import { TagManga } from '../model/tags';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { JsonData } from '../model/JSONmanga';
import { JsonData as JSONchap } from '../model/JSONchap';
import { JsonData as JSONimg } from '../model/JSONmangaimg';
import { JsonData as JSONauthor } from '../model/JSONauthor';
import {ApiLaravelService} from './api-laravel.service';

@Injectable({
  providedIn: 'root'
})
export class MangaServicesService {

  list: Manga[];
  tags: TagManga;
  private urlAPIManga = 'http://localhost:8000/api/manga';

  getListManga(link?): Observable<JsonData[]> {
    if (!link) {
      return this.http.get<JsonData[]>(this.urlAPIManga).pipe(
        tap(recievedList => recievedList),
        catchError(error => of([

        ]))
      );
    } else {
      return this.http.get<JsonData[]>(link).pipe(
        tap(recievedList => recievedList),
        catchError(error => of([

        ]))
      );
    }
  }

  getRecentUpdateList(displayNumber:number, link?:string): Observable<JsonData[]>{
    if (!link) {
      return this.http.get<JsonData[]>(this.urlAPIManga + '/updatelist/'+displayNumber).pipe(
        tap(recievedList => recievedList),
        catchError(error => of([

        ]))
      );
    } else {
      return this.http.get<JsonData[]>(link).pipe(
        tap(recievedList => recievedList),
        catchError(error => of([

        ]))
      );
    }
  }

  getAuthor(id:number): Observable<JSONauthor[]> {
    return this.http.get<JSONauthor[]>(this.urlAPIManga + '/' + id + '/getauthor').pipe(
      tap(recievedList => recievedList),
      catchError(error => of([

      ])));
  }

  getInformation(id: number): Observable<Manga[]> {
    return this.http.get<Manga[]>(this.urlAPIManga + '/' + id).pipe(
      tap(recievedList => recievedList),
      catchError(error => of([

      ])));
  }

  getTagInfo(id: number): Observable<TagManga[]> {
    return this.http.get<TagManga[]>(this.urlAPIManga + '/' + id + '/tags').pipe(
      tap(receivedList => receivedList),
      catchError(error => of([

      ])));
  }

  getMangaChapImage(idManga:number, idChap:number): Observable<JSONimg[]>{
    return this.http.get<JSONimg[]>(this.urlAPIManga+'/'+idManga+'/chap/'+idChap).pipe(
        tap(recievedList => recievedList),
        catchError(error => of([
  
      ]))
    )
  }

  getListMangaChap(id:number, link?): Observable<JSONchap[]> {
      if (!link) {
        return this.http.get<JSONchap[]>(this.urlAPIManga+'/'+id+"/chap").pipe(
          tap(recievedList => recievedList),
          catchError(error => of([
  
          ]))
        );
      } else {
        return this.http.get<JSONchap[]>(link).pipe(
          tap(recievedList => recievedList),
          catchError(error => of([
  
          ]))
        );
      }
  }

  constructor(
    private http: HttpClient,
    private apiLaravel: ApiLaravelService
  ) { }
}
