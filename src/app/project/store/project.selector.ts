import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProjectState } from './state/project.model';

const getProjectSelector = createFeatureSelector<ProjectState>('project');

export const getProjects = createSelector(
    getProjectSelector,
    state => state.projectsColection
)