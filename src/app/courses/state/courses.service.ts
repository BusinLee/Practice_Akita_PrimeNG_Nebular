import { Injectable, ɵCurrencyIndex } from "@angular/core";
import { timer } from "rxjs";
import { CoursesStore } from "./courses.store";
import { courses } from "./courses.data";
import { map, mapTo } from 'rxjs/operators';
import { ID } from "@datorama/akita";
import { Course } from "./course.model";

@Injectable({ providedIn: 'root'})
export class CoursesService {
    constructor(private coursesStore: CoursesStore) {}

    getCourses() {
        timer(1000)
            .pipe(mapTo(courses))
            .subscribe(courses => {
                this.coursesStore.set(courses);
            });
    }

    getCourse(id: ID) {
        const course = courses.find(current => +current.id === +id)!;
        timer(50)
            .pipe(mapTo(course))
            .subscribe(course => {
                this.coursesStore.add(course);
            });
    }

    addCourse(courseData: Course): void {
        timer(50)
          .pipe(mapTo(courseData))
          .subscribe(course => this.coursesStore.add(course));
    }

    removeCourse(id: ID): void {
        timer(50)
        .pipe()
        .subscribe( () => this.coursesStore.remove(id));
    }

    updateCourse(courseData: Course): void {
        timer(50)
          .pipe(mapTo(courseData))
          .subscribe(course => this.coursesStore.update(courseData.id, { ...course }));
    }
}
