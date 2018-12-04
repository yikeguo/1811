import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private us: UserService,
    private router: Router) { }

  ngOnInit() {
    this.us.isLogin().subscribe(
      result => {
        if (result) {
          console.log('登录了!');
          this.router.navigate(['/main'])
        }else {
          console.log('还未登录~');
          this.router.navigate(['/user/login'])
        }
      }
    )
  }

}
