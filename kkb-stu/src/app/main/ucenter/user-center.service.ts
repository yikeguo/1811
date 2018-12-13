import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserCenterService {
  url ='/api/courses/';

  constructor(private http: HttpClient) { }

  searchCourse(keyword) {

    const params = new HttpParams()
      .append('keyword', keyword);
    return this.http.get(this.url + 'search', {params});
  }
}
