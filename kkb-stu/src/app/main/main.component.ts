import { Component, OnInit } from '@angular/core';
import { MenuItem, MenuItemType } from '../common/menu/menu.component';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  showMenu = false;
  showUserMenu = false;
  menuData:MenuItem[] = [
    {label: '设计学吧', url: 'uxd.kaikeba.com', type: MenuItemType.Link},
    {label: '产品学吧', url: 'pm.kaikeba.com', type: MenuItemType.Link}
  ];

  userMenuData:MenuItem[] = [
    {label: '我的课程', url: 'usercenter/course', type: MenuItemType.Route},
    {label: '我的消息', url: 'usercenter/message', type: MenuItemType.Route},
    {label: '退出', cb: () => {
      this.us.logout().subscribe(
        (result: boolean) => {
          if (result) {
            this.router.navigate(['/user/login'])
          }
        }
      )
    }, type: MenuItemType.Callback}
  ]

  constructor(private router: Router,
    private us: UserService) { }

  ngOnInit() {
  }

}
