import { Component, OnInit } from '@angular/core';
import { RegisterUser } from './register-user';
import { User, UserService } from '../user.service';
import { Result } from 'src/app/common/result';
import { interval } from 'rxjs';
import { take, scan } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: RegisterUser;

  codeImgSrc:string = null;

  isDisabled = false;
  btnText = "获取短信验证码";

  constructor(private us: UserService,
    private router: Router) { 
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

  getCodeSms() {
    this.us.getCodeSms(this.model.phone).subscribe(
      (result: Result<string>) => {
        if (result.success) {
          this.isDisabled = true;

          interval(1000).pipe(
            scan(i => i-1, 60),
            take(60)
          ).subscribe( i => {
            if(i > 0 ) {
              this.btnText = i + 's';
            } else {
              this.btnText = '获取短信验证码';
              this.isDisabled = false;
            }
          })
        }else {
          alert('get codeImg failed')
        }
      }
    )
  }

  register() {
    this.us.register(this.model).subscribe(
      (success) => {
        if(success) {
          this.router.navigate(['/main'])
        }else {
          alert('注册失败')
        }
      }
    )
  }


}
