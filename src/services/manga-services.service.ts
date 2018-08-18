import { Injectable } from '@angular/core';
import { Manga } from '../model/manga';
import { TagManga } from '../model/tags';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import * as jsonmodel from '../model/JSONmodel';
import {ApiLaravelService} from './api-laravel.service';
import { AppTokenService } from './app-token.service';
import { Bookmark } from '../model/bookmark';

@Injectable({
  providedIn: 'root'
})
export class MangaServicesService {

  list: Manga[];
  tags: TagManga;
  private urlAPIManga = 'http://localhost:8000/api/manga';

  getListManga(link?): Observable<jsonmodel.MangaJSON[]> {
    if (!link) {
      return this.http.get<jsonmodel.MangaJSON[]>(this.urlAPIManga).pipe(
        tap(recievedList => recievedList),
        catchError(error => of([

        ]))
      );
    } else {
      return this.http.get<jsonmodel.MangaJSON[]>(link).pipe(
        tap(recievedList => recievedList),
        catchError(error => of([

        ]))
      );
    }
  }

  getRecentUpdateList(displayNumber:number, link?:string): Observable<jsonmodel.MangaJSON[]>{
    if (!link) {
      return this.http.get<jsonmodel.MangaJSON[]>(this.urlAPIManga + '/updatelist/'+displayNumber).pipe(
        tap(recievedList => recievedList),
        catchError(error => of([

        ]))
      );
    } else {
      return this.http.get<jsonmodel.MangaJSON[]>(link).pipe(
        tap(recievedList => recievedList),
        catchError(error => of([

        ]))
      );
    }
  }

  getAuthor(id:number): Observable<jsonmodel.AuthorJSON[]> {
    return this.http.get<jsonmodel.AuthorJSON[]>(this.urlAPIManga + '/' + id + '/getauthor').pipe(
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

  getMangaChapImage(idManga:number, idChap:number): Observable<jsonmodel.MangaCoverJSON[]>{
    return this.http.get<jsonmodel.MangaCoverJSON[]>(this.urlAPIManga+'/'+idManga+'/chap/'+idChap).pipe(
        tap(recievedList => recievedList),
        catchError(error => of([
  
      ]))
    )
  }

  getListMangaChap(id:number, link?): Observable<jsonmodel.ChapJSON[]> {
      if (!link) {
        return this.http.get<jsonmodel.ChapJSON[]>(this.urlAPIManga+'/'+id+"/chap").pipe(
          tap(recievedList => recievedList),
          catchError(error => of([
  
          ]))
        );
      } else {
        return this.http.get<jsonmodel.ChapJSON[]>(link).pipe(
          tap(recievedList => recievedList),
          catchError(error => of([
  
          ]))
        );
      }
  }

  /**
   * Bookmark a manga. Return type is object JSON message
   * @param manga passed manga to unbookmark
   */
  bookmark(manga:Manga){
    return this.apiLaravel.getDataGetResponse('manga/'+manga.id+"/bookmark/"+this.token.getIDUser());
  }

  /**
   * Un-bookmark a manga. Return type is object JSON message
   * @param manga passed manga to unbookmark
   */
  unbookmark(manga:Manga){
    return this.apiLaravel.getDataGetResponse('manga/'+manga.id+"/unbookmark/"+this.token.getIDUser());
  }

  markRead(bookmark:Bookmark){
    return this.apiLaravel.getDataGetResponse('manga/'+bookmark.idManga+"/read/"+this.token.getIDUser());
  }

  markReadID(idManga){
    return this.apiLaravel.getDataGetResponse('manga/'+idManga+"/read/"+this.token.getIDUser());
  }

  markUnRead(bookmark:Bookmark){
    return this.apiLaravel.getDataGetResponse('manga/'+bookmark.idManga+"/unread/"+this.token.getIDUser());
  }

  markUnReadID(idManga){
    return this.apiLaravel.getDataGetResponse('manga/'+idManga+"/unread/"+this.token.getIDUser());
  }

  constructor(
    private http: HttpClient,
    private apiLaravel: ApiLaravelService,
    private token: AppTokenService
  ) { }
}
