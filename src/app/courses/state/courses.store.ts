import { Injectable } from "@angular/core";
import { EntityState, EntityStore, StoreConfig } from "@datorama/akita";
import { Course } from "./course.model";

export interface CoursesState extends EntityState<Course> {}

@Injectable({ providedIn: 'root'})
@StoreConfig({ name: 'courses'})
export class CoursesStore extends EntityStore<CoursesState, Course> {

    constructor() {
        super();
    }
    
}
