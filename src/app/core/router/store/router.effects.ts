import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Router} from '@angular/router';
import { Store } from '@ngrx/store';
import { getRouterSelector } from './router.selectore';
import { map, tap } from 'rxjs/operators';
import { RouterGo, RouterStart, Navigation } from './router.action';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';

@Injectable()
export class RouterEffects{
    private presentRoute: any;

    @Effect({ dispatch: false })
    public navigate$ = this.action$.pipe(
        ofType('[Router] Go'),
        map((action: RouterGo) => action.payload.navigatedTo),
        tap(({ path, queryParams, extras }) =>
        this.router.navigate(path, { queryParams, ...extras })
        )
    );

    @Effect({ dispatch: false })
    public navigateStart$  = this.action$.pipe(
        ofType('[Router] Router Start'),
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

  constructor(
      private action$: Actions,
      private router: Router,
      private routerStore: Store<any>
  ){
      this.routerStore.select(getRouterSelector).subscribe(
          presentRoute =>{
              this.presentRoute = presentRoute;
          }
      )
  }
}