import { Component, OnInit } from '@angular/core';
import { LoginUser } from '../login-user';
import { User, UserService } from '../user.service';
import { Result } from '../common/result';

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
          alert('suc')
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
