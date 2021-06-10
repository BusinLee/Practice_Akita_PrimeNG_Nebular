import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesQuery } from '../state/courses.query';
import { CoursesService } from '../state/courses.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  course = this.coursesQuery.selectEntity(this.courseId);

  constructor(
    private coursesQuery: CoursesQuery,
    private coursesService: CoursesService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if(this.coursesQuery.hasEntity(this.courseId) === false) {
      this.coursesService.getCourse(this.courseId);
    }
  }

  get courseId() {
    return this.activatedRoute.snapshot.params.id;
  }
}
