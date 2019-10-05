import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Router} from '@angular/router';
import { Store } from '@ngrx/store';
import { getRouterSelector } from './router.selector';
import { map, tap } from 'rxjs/operators';
import { RouterGo, RouterStart, Navigation } from './router.action';
import * as undoRedoAction from '../../undoredo/store/undoredo.action';
import { StateHistory } from '../../undoredo/store/state/undoredo.model';
import { UndoSuccess, RedoSuccess } from '../../undoredo/store/undoredo.action';
import * as routerAction from '../store/router.action'

@Injectable()
export class RouterEffects{
    private presentRoute: any;

    @Effect({ dispatch: false })
    public navigate$ = this.action$.pipe(
        ofType(routerAction.RouterActionTypes.RouterGo),
        map((action: RouterGo) => action.payload.navigatedTo),
        tap(({ path, queryParams, extras }) =>
            this.router.navigate(path, { queryParams, ...extras })
        )
    );

    @Effect({ dispatch: false })
    public navigateStart$  = this.action$.pipe(
        ofType(routerAction.RouterActionTypes.RouterStart),
        map((action: RouterStart) => action),
        tap(action => {
            const payload = {
                navigatedTo: action.payload.navigateTo,
                navigatedFrom: new Navigation([this.presentRoute.router.state.url])
            };
            this.routerStore.dispatch(
                new RouterGo(payload, action.isUndoRedoOperation)
            );
        })
    );

    @Effect({ dispatch: false })
    public undoNavigation$  = this.action$.pipe(
        ofType(undoRedoAction.UndoRedoActionTypes.UNDO),
        map((action: undoRedoAction.Undo) =>{
            if(action.payload.presentAction.type === routerAction.RouterActionTypes.RouterGo){
                this.routerStore.dispatch(
                    new RouterStart( {
                        navigateTo: new Navigation(
                            action.payload.presentAction.payload.navigatedFrom.path
                        )
                    }, true),
                );
                this.undoRedoStore.dispatch(new UndoSuccess())
            }
        })
    );

    @Effect({ dispatch: false })
    public redoNavigation$  = this.action$.pipe(
        ofType(undoRedoAction.UndoRedoActionTypes.REDO),
        map((action: undoRedoAction.Redo) =>{
            if(action.payload.fututeAction.type === routerAction.RouterActionTypes.RouterGo){
                this.routerStore.dispatch(
                    new RouterStart({
                        navigateTo: new Navigation(
                            action.payload.fututeAction.payload.navigatedTo.path
                        )
                    }, true)
                );
                this.undoRedoStore.dispatch(new RedoSuccess())
            }
        })
    );

  constructor(
      private action$: Actions,
      private router: Router,
      private routerStore: Store<any>,
      private undoRedoStore: Store<StateHistory>
  ){
      this.routerStore.select(getRouterSelector).subscribe(
          presentRoute =>{
              this.presentRoute = presentRoute;
          }
      )
  }
}