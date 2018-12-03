import { Component, OnInit } from '@angular/core';
import { RegisterUser } from './register-user';
import { UserService } from '../user.service';
import { Result } from 'src/app/common/result';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: RegisterUser;

  codeImgSrc:string = null;

  constructor(private us: UserService) { 
    this.model = new RegisterUser();
  }

  ngOnInit() {
    this.getCodeImg();
  }

  getCodeImg() {
    this.us.getCodeImg().subscribe(
      (result: Result<string>) => {
        if (result.success) {
          this.codeImgSrc = 'data:image/png;base64,' + result.data;
        }else {
          alert('get codeImg failed')
        }
      }
    )
  }

  register() {

  }


}
