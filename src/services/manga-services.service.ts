import { Injectable } from '@angular/core';
import { Manga } from '../model/manga';
import { Mangatags } from '../model/mangatags';
import { TagManga } from '../model/tags';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { JsonData } from '../model/JSONmanga';
import {ApiLaravelService} from '../app/api-laravel.service';

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

  getInformation(id: number): Observable<Manga[]> {
    return this.http.get<Manga[]>(this.urlAPIManga + '/' + id).pipe(
      tap(recievedList => recievedList),
      catchError(error => of([

      ])));
  }

  getListTagsID(id: number): Observable<Mangatags[]> {
    return this.http.get<Mangatags[]>(this.urlAPIManga + '/' + id + '/tags').pipe(
      tap(receivedList =>
        receivedList
      ),
      catchError(error => of([

      ])));
  }

  getTagInfo(id: number): Observable<TagManga[]> {
    // return this.apiLaravel.getDataGet('tags/' + id, this.tags).subscribe(
    //   returnInfo => returnInfo
    // );
    return this.http.get<TagManga[]>(this.urlAPIManga + '/' + id + '/tags').pipe(
      tap(receivedList => {
        console.log(receivedList);
        return receivedList;
      }),
      catchError(error => of([

      ])));
  }

  constructor(
    private http: HttpClient,
    private apiLaravel: ApiLaravelService
  ) { }
}
