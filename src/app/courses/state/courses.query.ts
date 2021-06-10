import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";
import { Course } from "./course.model";
import { CoursesState, CoursesStore } from "./courses.store";

@Injectable({ providedIn: 'root'})
export class CoursesQuery extends QueryEntity<CoursesState, Course> {
    constructor(protected store: CoursesStore) {
        super(store);
    }
}
