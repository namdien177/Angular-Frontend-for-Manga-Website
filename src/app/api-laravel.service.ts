import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiLaravelService {

  constructor(private http: HttpClient) { }

  private url_api = 'http://127.0.0.1:8000';

  getDataPost(route: string, data) {
    return this.http.post(this.url_api + '/api/' + route + '', data);
  }

  getDataGet(route: String, data) {
    return this.http.get(this.url_api + '/api/' + route + '', data);
  }

}
