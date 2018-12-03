import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../user.service';
import { Result } from './../../common/result';
import { LoginUser } from './login-user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  model: LoginUser;

  constructor(private us: UserService) { 
    this.model = new LoginUser();
  }

  login() {
    console.log( this.model );
    
    this.us.login(this.model).subscribe( 
      (result: Result<User>) => {
        console.log(result);
        if(result.success) {
          alert('登录成功')
        }else {
          alert('没有返回User')
        }
      },
      (error: any) => {
        console.log(error);``
      }
    )
  }
}
