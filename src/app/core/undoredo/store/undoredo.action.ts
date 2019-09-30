import { Action } from '@ngrx/store';

export enum UndoRedoActionTypes {
  UNDO = '[UndoRedo Component] UNDO',
  REDO = '[UndoRedo Component] REDO',
  UNDOSuccess = '[UndoRedo Component] UNDO Success',
  REDOSuccess = '[UndoRedo Component] REDO Success',
  UpdateUndoRedo = '[UndoRedo Component] Update undoredo',
  ClearHistory = '[UndoRedo Component] ClearHistory'
}

export class Undo implements Action {
  public readonly type = UndoRedoActionTypes.UNDO;
  constructor(public payload: any) {}
}

export class Redo implements Action {
  public readonly type = UndoRedoActionTypes.REDO;
  constructor(public payload: any) {}
}

export class UndoSuccess implements Action {
  public readonly type = UndoRedoActionTypes.UNDOSuccess;
  constructor() {}
}

export class RedoSuccess implements Action {
  public readonly type = UndoRedoActionTypes.REDOSuccess;
  constructor() {}
}

export class UpdateUndoRedo implements Action {
  public readonly type = UndoRedoActionTypes.UpdateUndoRedo;
  constructor(public payload: any) {}
}

export class ClearHistory implements Action {
  public readonly type = UndoRedoActionTypes.ClearHistory;
  constructor() {}
}
export type UndoRedoActions =
  | Undo
  | Redo
  | UndoSuccess
  | RedoSuccess
  | ClearHistory
  | UpdateUndoRedo;