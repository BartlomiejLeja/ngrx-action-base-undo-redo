import { ActionReducer, MetaReducer } from '@ngrx/store';
import * as landActions from '../../land/store/land.action';
import * as projectActions from '../../project/store/project.action';
import * as routerAction from '../router/store/router.action'
import * as _ from 'lodash';

export const metaReducers: MetaReducer<any>[] = [undoRedoActionSave];

export function undoRedoActionSave(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action: any) {
    if((action.type.includes(projectActions.ProjectActionTypes.GetProjectsSuccess) || 
       action.type.includes(landActions.LandActionTypes.GetLandsSuccess)) && 
       !isDuplicatedGetAction(state, action)){
      const newPast = pushGetActionToPastArray(state.undoredo.history.past, action);
      state.undoredo = {
        ...state.undoRedo,
        history: {
          ...history,
          past: _.cloneDeep(newPast),
          future: []
        },

        isInProgress: false
      };
    }else if(
      ((action.type.includes(routerAction.RouterActionTypes.RouterGo) && !isTheSameRouteAction(action))||  
      action.type.includes(landActions.LandActionTypes.AddLandSuccess) ||
      action.type.includes(landActions.LandActionTypes.UpdateLandNameSuccess) ||
      action.type.includes(landActions.LandActionTypes.RemoveLandSuccess) ||
      action.type.includes(projectActions.ProjectActionTypes.AddProjectSuccess) ||
      action.type.includes(projectActions.ProjectActionTypes.UpdateProjectNameSuccess) ||
      action.type.includes(projectActions.ProjectActionTypes.RemoveProjectSuccess)
      ) && !action.isUndoRedoOperation 
    ){
        const newPast = [...state.undoredo.history.past, action];
        state.undoredo = {
          ...state.undoRedo,
          history: {
            ...history,
            past: _.cloneDeep(newPast),
            future: []
          },
          isInProgress: false
        };
    }
    return reducer(state, action);
  };
}

function pushGetActionToPastArray(past: any[] , action: any): Array<any>{
  let newPast = [...past];
  newPast.splice(0,0,action);
  return newPast;
}

function isDuplicatedGetAction(state, action: any){
 let isDuplicatedGetAction = false
 state.undoredo.history.past.forEach(pastAction => {
   if(pastAction.type === action.type){
    isDuplicatedGetAction = true;
   }
 });
 return isDuplicatedGetAction;
}

function isTheSameRouteAction(action: any){
  return action.payload.navigatedFrom.path[0].includes(action.payload.navigatedTo.path[0]);
}