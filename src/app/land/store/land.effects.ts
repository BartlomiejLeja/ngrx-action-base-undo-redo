import { Injectable } from "@angular/core";
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { switchMap, map, catchError, take } from 'rxjs/operators';
import { LandService } from '../services/land.service';
import * as landActions from '../store/land.action';
import * as undoRedoAction from '../../core/undoredo/store/undoredo.action';
import { LandState } from './state/land.model';
import { StateHistory } from '../../core/undoredo/store/state/undoredo.model';
import { UndoSuccess, RedoSuccess } from '../../core/undoredo/store/undoredo.action';
// import { getLastLandState } from '../../core/undoredo/store/undoredo.reducer';
import * as _ from 'lodash';
import { getLastLandState } from 'src/app/core/undoredo/store/undoredo.selector';

@Injectable()
export class LandEffects {
    @Effect()
    public loadLands : Observable<Action> = this.action$.pipe(
        ofType(landActions.LandActionTypes.GetLands),
        switchMap(()=> 
            this.landService.getLands().pipe(
                map(
                    lands => new landActions.GetLandsSuccess(lands)
                ),
                catchError(()=>of(new landActions.GetLandsFail()))
            )
        )
    )

    @Effect()
    public updateLandName : Observable<Action> = this.action$.pipe(
        ofType(landActions.LandActionTypes.UpdateLandName),
        switchMap((action: any)=> 
            this.landService.updateLandName(action.payload.landId,action.payload.landName)
            .pipe(
                map(
                    lands => new landActions.UpdateLandNameSuccess(action.payload,action.isUndoRedoOperation)
                ),
                catchError(()=>of(new landActions.UpdateLandNameFail()))
            )
        )
    )

    @Effect()
    public AddLand : Observable<Action> = this.action$.pipe(
        ofType(landActions.LandActionTypes.AddLand),
        switchMap((action: any)=> 
            this.landService.addLand(action.payload)
            .pipe(
                map(
                    lands => new landActions.AddLandSuccess(action.payload,action.isUndoRedoOperation)
                ),
                catchError(()=>of(new landActions.AddLandFail()))
            )
        )
    )

    @Effect()
    public RemoveLand : Observable<Action> = this.action$.pipe(
        ofType(landActions.LandActionTypes.RemoveLand),
        switchMap((action: any)=> 
            this.landService.deleteLand(action.payload)
            .pipe(
                map(
                    lands => new landActions.RemoveLandSuccess(action.payload,action.isUndoRedoOperation)
                ),
                catchError(()=>of(new landActions.RemoveLandFail()))
            )
        )
    )

    @Effect({ dispatch: false })
    public undoLand$ = this.action$.pipe(
        ofType(undoRedoAction.UndoRedoActionTypes.UNDO),
        map((action: undoRedoAction.Undo) =>{
            if(action.payload.presentAction.type===landActions.LandActionTypes.AddLandSuccess){
                this.landStore.dispatch(new landActions.RemoveLand(action.payload.presentAction.payload.id,true))
                this.undoRedoStore.dispatch(new UndoSuccess())
            }
            else if(action.payload.presentAction.type===landActions.LandActionTypes.UpdateLandNameSuccess){
                this.undoRedoStore.select(getLastLandState).pipe(take(1)).subscribe((lastLandState)=>{
                    this.lastLandState = lastLandState;
                    let landToAdd = this.lastLandState.find(land => land.id == action.payload.presentAction.payload.landId)
                    this.landStore.dispatch(new landActions.UpdateLandName(
                        {landId: landToAdd.id, landName: landToAdd.landName},true))
            
                })
                this.undoRedoStore.dispatch(new UndoSuccess())
            }else if(action.payload.presentAction.type===landActions.LandActionTypes.RemoveLandSuccess){
                this.undoRedoStore.select(getLastLandState).pipe(take(1)).subscribe((lastLandState)=>{
                    this.lastLandState = lastLandState;
                    let landToAdd = this.lastLandState.find(land => land.id == action.payload.presentAction.payload)
                    this.landStore.dispatch(new landActions.AddLand(
                        landToAdd,true))
            
                })
                this.undoRedoStore.dispatch(new UndoSuccess())
            }
        })
    )

    @Effect({ dispatch: false })
    public redoLand$ = this.action$.pipe(
        ofType(undoRedoAction.UndoRedoActionTypes.REDO),
        map((action: undoRedoAction.Redo) =>{
            if(action.payload.fututeAction.type===landActions.LandActionTypes.AddLandSuccess){
                this.landStore.dispatch(new landActions.AddLand(action.payload.fututeAction.payload, true))
                this.undoRedoStore.dispatch(new RedoSuccess())
            } else if(action.payload.fututeAction.type===landActions.LandActionTypes.UpdateLandNameSuccess){
                this.landStore.dispatch(new landActions.UpdateLandName(
                    action.payload.fututeAction.payload,true));
                    this.undoRedoStore.dispatch(new RedoSuccess())
            }
            else if(action.payload.fututeAction.type===landActions.LandActionTypes.RemoveLandSuccess){
                this.landStore.dispatch(new landActions.RemoveLand(action.payload.fututeAction.payload,true))
                this.undoRedoStore.dispatch(new RedoSuccess())
            }
        })
    )

    private lastLandState: any;
    constructor(
        private action$: Actions,
        private landService: LandService,
        private landStore: Store<LandState>,
        private undoRedoStore: Store<StateHistory>
    ) {
    }
}