import { Component, OnInit, Input } from '@angular/core';

export enum MenuItemType {
  Link = 'link',
  Route = 'route',
  Callback = 'callback',
}

export interface MenuItem {
  label: string;
  type: MenuItemType;
  url?: string;
  cb?: () => void;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Input()
  data: MenuItem[];

  constructor() { }

  ngOnInit() {
  }

}
