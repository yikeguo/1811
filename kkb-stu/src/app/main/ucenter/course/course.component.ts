import { Component, OnInit } from '@angular/core';
import { CourseService, Course } from './course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  isHidden = false;
  private courses: Course[];
  
  constructor(private cs: CourseService) { }

  ngOnInit() {
    this.cs.getMyCourses().subscribe(
      result => {
        console.log(result);
        this.courses = result;
      }
    );
  }

}
