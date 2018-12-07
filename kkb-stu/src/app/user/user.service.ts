import {Injectable} from '@angular/core';
import {LoginUser} from './login/login-user';
import {HttpClient} from '@angular/common/http';
import {Result} from '../common/result';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { RegisterUser } from './register/register-user';

export interface User {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = '/api/users/';

  user: User = null;
  
  constructor(private http: HttpClient) {
  }

  login(user: LoginUser) {
    return this.http.post<Result<User>>(this.url + 'login', user).pipe(
      map(this.handleLogin.bind(this)),
      catchError(error => of(false))
    );
    // return this.http.post<Result<User>>(this.url + 'login', user);
  }

  private handleLogin(r: Result<User>) {
    if(r.success) {
      this.user = r.data;
      return true;
    }else {
      return false;
    }
  }

  getCodeImg() {
    return this.http.get(this.url + 'code-img');
  }

  verifyPhone(phone) {
    return this.http.post(this.url + 'verify-phone', {phone})
  }
  
  verifyCodeImg(code) {
    return this.http.post(this.url + 'ver-code-img', {code});
  }
  getCodeSms(phone) {
    return this.http.get('api/code/' + phone);
  }

  register(user: RegisterUser) {
    return this.http.post(this.url + 'register', {
      phone: user.phone,
      password: user.password
    }).pipe(
      map(this.handleLogin.bind(this)),
      catchError(error => of(false))
    );
  }

  isLogin() {
    return this.http.post<Result<User>>(this.url + 'is-login', null).pipe(
      map(this.handleLogin.bind(this)),
      catchError(error => of(false))
    );
  }
}
