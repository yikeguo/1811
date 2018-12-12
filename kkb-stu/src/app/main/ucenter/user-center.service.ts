import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserCenterService {
  url ='/api/';

  constructor(private http: HttpClient) { }

  serarchCourse(keyword) {
    return this.http.get(this.url + 'search', {params: {}})
  }
}
