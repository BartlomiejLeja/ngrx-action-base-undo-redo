import { Action } from '@ngrx/store';
import { Project } from './state/projectState.model';

export enum ProjectActionTypes {
    GetProjects = '[Project] Get projects',
    GetProjectsSuccess  = '[Project] Get projects Success',
    GetProjectsFail = '[Project] Get projects Fail',
    UpdateProjectName = '[Project Component] Update project name',
    UpdateProjectNameSuccess = '[Project Component] Update project name Success',
    UpdateProjectNameFail = '[Project Component] Update project name Fail',
    AddProject ='[Project Component] Add project',
    AddProjectSuccess ='[Project Component] Add project Success',
    AddProjectFail ='[Project Component] Add project Fail',
    RemoveProject ='[Project Component] Remove project',
    RemoveProjectSuccess ='[Project Component] Remove project Success',
    RemoveProjectFail ='[Project Component] Remove project Fail',
}
export class GetProjects implements Action {
    public readonly type = ProjectActionTypes.GetProjects;
}

export class GetProjectsSuccess implements Action {
    public readonly type = ProjectActionTypes.GetProjectsSuccess;
    constructor(public payload: Project[]) {}
}

export class GetProjectsFail implements Action {
    public readonly type = ProjectActionTypes.GetProjectsFail;
}

export class UpdateProjectName implements Action {
    public readonly type = ProjectActionTypes.UpdateProjectName;
    constructor(public payload: any, 
        public isUndoRedoOperation: boolean = false) {}
}

export class UpdateProjectNameSuccess implements Action {
    public readonly type = ProjectActionTypes.UpdateProjectNameSuccess;
    constructor(public payload: any,
        public isUndoRedoOperation: boolean = false) {}
}

export class UpdateProjectNameFail implements Action {
    public readonly type = ProjectActionTypes.UpdateProjectNameFail;
}

export class AddProject implements Action {
    public readonly type = ProjectActionTypes.AddProject;
    constructor(
        public payload: any, 
        public isUndoRedoOperation: boolean = false
        ) {}
}

export class AddProjectSuccess implements Action {
    public readonly type = ProjectActionTypes.AddProjectSuccess;
    constructor(
        public payload: any,  
        public isUndoRedoOperation: boolean = false) {}
}

export class AddProjectFail implements Action {
    public readonly type = ProjectActionTypes.AddProjectFail;
}


export class RemoveProject implements Action {
    public readonly type = ProjectActionTypes.RemoveProject;
    constructor(public payload: any,
        public isUndoRedoOperation: boolean = false) {}
}

export class RemoveProjectSuccess implements Action {
    public readonly type = ProjectActionTypes.RemoveProjectSuccess;
    constructor(public payload: any,
        public isUndoRedoOperation: boolean = false) {}
}

export class RemoveProjectFail implements Action {
    public readonly type = ProjectActionTypes.RemoveProjectFail;
}

export type ProjectActions = 
    | GetProjectsSuccess
    | GetProjectsFail 
    | UpdateProjectNameSuccess  
    | UpdateProjectNameFail
    | AddProject
    | AddProjectSuccess
    | AddProjectFail
    | RemoveProject
    | RemoveProjectSuccess
    | RemoveProjectFail

