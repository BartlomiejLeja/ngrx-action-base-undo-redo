import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { Project } from '../models/project.model';

@Injectable({ providedIn: 'root' })
export class ProjectService 
// extends EntityCollectionServiceBase<Project>
 {
  // constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
  //   super('Project', serviceElementsFactory);
  // }
}