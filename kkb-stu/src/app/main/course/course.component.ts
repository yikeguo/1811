import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CourseService, Course, Pandect, Stage } from '../ucenter/course/course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  course: Course = null;
  pandect: Pandect = null;
  stages: Stage[] = null;

  constructor(private route: ActivatedRoute,
              private cs: CourseService) { 
    
  }

  ngOnInit() {
    this.route.paramMap.subscribe((pm: ParamMap) => {
      console.log(pm.get('classId'))

      this.cs.getCourseById(pm.get('classId')).subscribe(
        c => this.course = c
      )
      this.cs.getStages(pm.get('classId')).subscribe(
        s => this.stages = s
      )
      this.cs.getPandect(pm.get('classId')).subscribe(
        p => this.pandect = p
      )
    })
  }

}
