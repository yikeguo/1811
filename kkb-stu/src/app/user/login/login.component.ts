import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../user.service';
import { Result } from './../../common/result';
import { LoginUser } from './login-user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  model: LoginUser;

  constructor(private us: UserService,
    private router: Router) { 
    this.model = new LoginUser();
  }

  login() {
    console.log( this.model );
    
    this.us.login(this.model).subscribe( 
      (result: boolean) => {
        if (result) {
          this.router.navigate(['/main'])
        } else {
          alert('登录失败！');
        }
      }
    )
  }
}
