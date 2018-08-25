import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ResponseMessage } from '../model/JSONmodel';

@Injectable({
  providedIn: 'root'
})
export class ApiLaravelService {

  constructor(private http: HttpClient) { }

  private url_api = 'http://127.0.0.1:8000';

  getDataPost(route: string, data) {
    return this.http.post(this.url_api + '/api/' + route + '', data);
  }

  getDataGet(route: string):Observable<Object[]>{
    return this.http.get<Object[]>(this.url_api + '/api/' + route + '').pipe(
      tap(recievedList => recievedList),
      catchError(error => of([

      ])));
  }

  getDataGetResponse(route: String):Observable<ResponseMessage[]>{
    return this.http.get<ResponseMessage[]>(this.url_api + '/api/' + route + '').pipe(
      tap(recievedList => recievedList),
      catchError(error => of([

      ])));
  }

  getDataPostResponse(route: String, formData):Observable<ResponseMessage[]>{
    return this.http.post<ResponseMessage[]>(this.url_api + '/api/' + route + '',formData).pipe(
      tap(recievedList => recievedList),
      catchError(error => of([

      ])));
  }

}
