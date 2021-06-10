import { stringify } from '@angular/compiler/src/util';
import { TemplateRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ID } from '@datorama/akita';
import { NbDialogService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { Course } from './state/course.model';
import { courses } from './state/courses.data'
import { CoursesQuery } from './state/courses.query';
import { CoursesService } from './state/courses.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courseList : Observable<Course[]>;
  sortControl = new FormControl();
  categories: any[];
  loadingData: Observable<boolean>;
  addForm: FormGroup;
  idUpdate: ID;
  idRemove: ID;

  constructor(
    private coursesQuery: CoursesQuery,
    private coursesService: CoursesService,
    private dialogService: NbDialogService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.addForm = this.fb.group({
      name: [],
      desc: [],
      price: []
    })
    this.courseList = this.sortControl.valueChanges.pipe(
      startWith<keyof Course>('id'),
      switchMap(sortBy => {
        if (typeof sortBy === 'object' && sortBy !== null) {
          sortBy = sortBy['id'];
        }
        return this.coursesQuery.selectAll({sortBy: sortBy});
      })
    );
    this.categories = [
      {
        id: 'name',
        label: 'Name',
      },
      {
        id: 'price',
        label: 'Price',
      }
    ];
    this.loadingData = this.coursesQuery.selectLoading();
    this.getCourses();
  }

  getCourses() {
    this.coursesService.getCourses();
  }

  removeCourse() {
    this.coursesService.removeCourse(this.idRemove);
  }

  openAddDialog(dialog: TemplateRef<any>, courseData?: Course) {
    if (courseData) {
      this.idUpdate = courseData.id;
      this.addForm.controls['name'].setValue(courseData.name);
      this.addForm.controls['desc'].setValue(courseData.description);
      this.addForm.controls['price'].setValue(courseData.price);
    } else {
      this.idUpdate = -1;
      this.addForm.reset();
    }
    this.dialogService.open(dialog);
  }

  openRemoveConfirmDialog(dialog: TemplateRef<any>, idCourse: ID) {
    this,this.idRemove = idCourse;
    this.dialogService.open(dialog);
  }

  handleCourse() {
    if (this.idUpdate === -1) {
      let courseData: Course = {
        id: uuidv4(),
        name: this.addForm.controls['name'].value,
        description: this.addForm.controls['desc'].value,
        price: this.addForm.controls['price'].value
      };
      this.coursesService.addCourse(courseData);
    } else {
      let courseData: Course = {
        id: this.idUpdate,
        name: this.addForm.controls['name'].value,
        description: this.addForm.controls['desc'].value,
        price: this.addForm.controls['price'].value
      };
      this.coursesService.updateCourse(courseData);
    }
  }
}
