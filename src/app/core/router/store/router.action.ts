import { Action } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export enum RouterActionTypes {
  RouterGo = '[Router] Go',
  RouterStart = '[Router] Router Start'
}

export class Navigation {
  public path: any[];
  public queryParams?: object;
  public extras?: NavigationExtras;
  constructor(path?: any[], queryParams?: object, extras?: NavigationExtras) {
    (this.path = path), (this.queryParams = queryParams);
    this.extras = extras;
  }
}

export class RouterGo implements Action {
  public readonly type = '[Router] Go';

  constructor(
    public payload: {
      navigatedTo: Navigation;
      navigatedFrom: Navigation;
    },
    public isUndoRedoOperation: boolean = false
  ) {}
}

export class RouterStart implements Action {
  public readonly type = '[Router] Router Start';

  constructor(
    public payload: {
      navigateTo: Navigation;
    },
    public isUndoRedoOperation: boolean = false
  ) {}
}

export type RouterActions = RouterGo | RouterStart;