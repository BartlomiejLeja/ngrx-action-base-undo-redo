import { Injectable } from "@angular/core";
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { switchMap, map, catchError } from 'rxjs/operators';
import { LandService } from '../services/land.service';
import * as landActions from '../store/land.action';

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
        switchMap((payload: any)=> 
            this.landService.updateLandName(payload.payload.landId,payload.payload.landName)
            .pipe(
                map(
                    lands => new landActions.UpdateLandNameSuccess(payload.payload)
                ),
                catchError(()=>of(new landActions.UpdateLandNameFail()))
            )
        )
    )

    @Effect()
    public AddLandName : Observable<Action> = this.action$.pipe(
        ofType(landActions.LandActionTypes.AddLand),
        switchMap((payload: any)=> 
            this.landService.addLand(payload.payload)
            .pipe(
                map(
                    lands => new landActions.AddLandSuccess(payload.payload)
                ),
                catchError(()=>of(new landActions.AddLandFail()))
            )
        )
    )

    @Effect()
    public RemoveLand : Observable<Action> = this.action$.pipe(
        ofType(landActions.LandActionTypes.RemoveLand),
        switchMap((payload: any)=> 
            this.landService.deleteLand(payload.payload)
            .pipe(
                map(
                    lands => new landActions.RemoveLandSuccess(payload.payload)
                ),
                catchError(()=>of(new landActions.RemoveLandFail()))
            )
        )
    )


    constructor(
        private action$: Actions,
        private landService: LandService
    ) {}
}