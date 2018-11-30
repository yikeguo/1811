import {Injectable} from '@angular/core';
import {LoginUser} from './login/login-user';
import {HttpClient} from '@angular/common/http';
import {Result} from '../common/result';

export interface User {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = '/api/users/';

  constructor(private http: HttpClient) {
  }

  login(user: LoginUser) {
    return this.http.post<Result<User>>(this.url + 'login', user);
    // return this.http.post<Result<User>>(this.url + 'login', user);
  }

  getCodeImg() {
    return this.http.get(this.url + 'code-img');
  }

  verifyPhone(phone) {
    return this.http.post(this.url + 'verify-phone', {phone})
  }
}
