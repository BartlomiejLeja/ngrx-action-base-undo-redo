import { Action } from '@ngrx/store';
import { Land } from './state/land.model';

export enum LandActionTypes {
    GetLands = '[Land] @ngrx/data/query-all',
    GetLandsSuccess  = '[Land] @ngrx/data/query-all/success',
    GetLandsFail = '[Land] @ngrx/data/query-all/fail',
    UpdateLandName = '[Land Component] Update land name',
    UpdateLandNameSuccess = '[Land Component] Update land name Success',
    UpdateLandNameFail = '[Land Component] Update land name Fail',
    AddLand ='[Land Component] Add land',
    AddLandSuccess ='[Land Component] Add land Success',
    AddLandFail ='[Land Component] Add land Fail',
    RemoveLand ='[Land Component] Remove land',
    RemoveLandSuccess ='[Land Component] Remove land Success',
    RemoveLandFail ='[Land Component] Remove land Fail',
}
export class GetLands implements Action {
    public readonly type = LandActionTypes.GetLands;
}

export class GetLandsSuccess implements Action {
    public readonly type = LandActionTypes.GetLandsSuccess;
    constructor(public payload: Land[]) {}
}

export class GetLandsFail implements Action {
    public readonly type = LandActionTypes.GetLandsFail;
}

export class UpdateLandName implements Action {
    public readonly type = LandActionTypes.UpdateLandName;
    constructor(public payload: any, 
        public isUndoRedoOperation: boolean = false) {}
}

export class UpdateLandNameSuccess implements Action {
    public readonly type = LandActionTypes.UpdateLandNameSuccess;
    constructor(public payload: any,
        public isUndoRedoOperation: boolean = false) {}
}

export class UpdateLandNameFail implements Action {
    public readonly type = LandActionTypes.UpdateLandNameFail;
}

export class AddLand implements Action {
    public readonly type = LandActionTypes.AddLand;
    constructor(
        public payload: any, 
        public isUndoRedoOperation: boolean = false
        ) {}
}

export class AddLandSuccess implements Action {
    public readonly type = LandActionTypes.AddLandSuccess;
    constructor(
        public payload: any,  
        public isUndoRedoOperation: boolean = false) {}
}

export class AddLandFail implements Action {
    public readonly type = LandActionTypes.AddLandFail;
}


export class RemoveLand implements Action {
    public readonly type = LandActionTypes.RemoveLand;
    constructor(public payload: any,
        public isUndoRedoOperation: boolean = false) {}
}

export class RemoveLandSuccess implements Action {
    public readonly type = LandActionTypes.RemoveLandSuccess;
    constructor(public payload: any,
        public isUndoRedoOperation: boolean = false) {}
}

export class RemoveLandFail implements Action {
    public readonly type = LandActionTypes.RemoveLandFail;
}


export type LandActions = 
    | GetLandsSuccess
    | GetLandsFail 
    | UpdateLandNameSuccess  
    | UpdateLandNameFail
    | AddLand
    | AddLandSuccess
    | AddLandFail
    | RemoveLand
    | RemoveLandSuccess
    | RemoveLandFail

