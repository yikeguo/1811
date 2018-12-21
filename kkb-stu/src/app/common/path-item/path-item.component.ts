import { Component, OnInit, Input } from '@angular/core';
import { Stage } from 'src/app/main/ucenter/course/course.service';

@Component({
  selector: 'app-path-item',
  templateUrl: './path-item.component.html',
  styleUrls: ['./path-item.component.css']
})
export class PathItemComponent implements OnInit {
  @Input() stage: Stage;
  open = false;
  showButton = false;

  constructor() { }

  ngOnInit() {
  }

}
