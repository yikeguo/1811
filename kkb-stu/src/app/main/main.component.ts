import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  showMenu = false;
  menuData = [
    {label: '设计学吧', url: 'uxd.kaikeba.com', type: 'link'},
    {label: '产品学吧', url: 'pm.kaikeba.com', type: 'link'}
  ]

  constructor() { }

  ngOnInit() {
  }

}
