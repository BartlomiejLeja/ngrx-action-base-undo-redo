import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { StateHistory } from '../../core/undoredo/store/state/undoredo.model';
import { Store, Action } from '@ngrx/store';
import * as undoRedoAction from '../../core/undoredo/store/undoredo.action';
import * as projectActions from '../store/project.action';
import { map, switchMap, catchError, take } from 'rxjs/operators';
import { ProjectService } from '../services/project.service';
import { Observable } from 'rxjs/internal/Observable';
import { ProjectDataService } from '../services/project-data.service';
import { of } from 'rxjs';
import { ProjectState } from './state/projectState.model';
import { getLastProjectState } from '../../core/undoredo/store/undoredo.reducer';
@Injectable()
export class ProjectEffects {
    
    @Effect()
    public loadProjects : Observable<Action> = this.action$.pipe(
        ofType(projectActions.ProjectActionTypes.GetProjects),
        switchMap(()=> 
            this.projectDataService.getProjects().pipe(
                map(
                    projects => new projectActions.GetProjectsSuccess(projects)
                ),
                catchError(()=>of(new projectActions.GetProjectsFail()))
            )
        )
    )

    @Effect()
    public AddProject : Observable<Action> = this.action$.pipe(
        ofType(projectActions.ProjectActionTypes.AddProject),
        switchMap((action: any)=> 
            this.projectDataService.addProject(action.payload)
            .pipe(
                map(
                    project => new projectActions.AddProjectSuccess(action.payload,action.isUndoRedoOperation)
                ),
                catchError(()=>of(new projectActions.AddProjectFail()))
            )
        )
    )

    @Effect()
    public updateProjectName : Observable<Action> = this.action$.pipe(
        ofType(projectActions.ProjectActionTypes.UpdateProjectName),
        switchMap((action: any)=> 
            this.projectDataService.updateProjectName(action.payload.projectId,action.payload.projectName)
            .pipe(
                map(
                    lands => new projectActions.UpdateProjectNameSuccess(action.payload,action.isUndoRedoOperation)
                ),
                catchError(()=>of(new projectActions.UpdateProjectNameFail()))
            )
        )
    )

    
    @Effect()
    public removeProject : Observable<Action> = this.action$.pipe(
        ofType(projectActions.ProjectActionTypes.RemoveProject),
        switchMap((action: any)=> 
            this.projectDataService.deleteProject(action.payload)
            .pipe(
                map(
                    lands => new projectActions.RemoveProjectSuccess(action.payload,action.isUndoRedoOperation)
                ),
                catchError(()=>of(new projectActions.RemoveProjectFail()))
            )
        )
    )

    @Effect({ dispatch: false })
    public undoProject$ = this.action$.pipe(
        ofType(undoRedoAction.UndoRedoActionTypes.UNDO),
        map((action: undoRedoAction.Undo) =>{
            if(action.payload.presentAction.type==='[Project Component] Add project Success'){
                this.projectStore.dispatch(new projectActions.RemoveProject(action.payload.presentAction.payload.id))
                this.undoRedoStore.dispatch(new undoRedoAction.UndoSuccess())
            } else if(action.payload.presentAction.type==='[Project Component] Update project name Success'){
                this.undoRedoStore.select(getLastProjectState).pipe(take(1)).subscribe((lastProjectState)=>{
                    this.lastProjectState = lastProjectState;
                    let projectToAdd = this.lastProjectState.find(project => project.id == action.payload.presentAction.payload.projectId)
                    this.projectStore.dispatch(new projectActions.UpdateProjectName(
                        {projectId: projectToAdd.id, projectName: projectToAdd.projectName},true))
            
                })
                this.undoRedoStore.dispatch(new undoRedoAction.UndoSuccess())
            }
            else if(action.payload.presentAction.type===projectActions.ProjectActionTypes.RemoveProjectSuccess){
                this.undoRedoStore.select(getLastProjectState).pipe(take(1)).subscribe((lastProjectState)=>{
                    this.lastProjectState = lastProjectState;
                    let landToAdd = this.lastProjectState.find(land => land.id == action.payload.presentAction.payload)
                    this.projectStore.dispatch(new projectActions.AddProject(
                        landToAdd,true))
            
                })
                this.undoRedoStore.dispatch(new undoRedoAction.UndoSuccess())
            }
        }
    )
    )

    @Effect({ dispatch: false })
    public redoProject$ = this.action$.pipe(
        ofType(undoRedoAction.UndoRedoActionTypes.REDO),
        map((action: undoRedoAction.Redo) =>{
            if(action.payload.fututeAction.type==='[Project Component] Add project Success'){
                //this.projectService.add(action.payload.fututeAction.payload.data, {tag: 'Redo add'}),
                this.projectStore.dispatch(new projectActions.AddProject(action.payload.fututeAction.payload, true))
                this.undoRedoStore.dispatch(new undoRedoAction.RedoSuccess())
            }else if (action.payload.fututeAction.type==='[Project Component] Update project name Success'){
                this.projectStore.dispatch(new projectActions.UpdateProjectName(
                    action.payload.fututeAction.payload,true));
                    this.undoRedoStore.dispatch(new undoRedoAction.RedoSuccess())
            }
            else if(action.payload.fututeAction.type===projectActions.ProjectActionTypes.RemoveProjectSuccess){
                this.projectStore.dispatch(new projectActions.RemoveProject(action.payload.fututeAction.payload,true))
                this.undoRedoStore.dispatch(new undoRedoAction.RedoSuccess())
            }
        }
    )
    )
    private lastProjectState: any;
    constructor(
        private action$: Actions,
        private projectService: ProjectService,
        private undoRedoStore: Store<StateHistory>,
        private projectDataService: ProjectDataService,
        private projectStore: Store<ProjectState>,
    ) {
    }
}