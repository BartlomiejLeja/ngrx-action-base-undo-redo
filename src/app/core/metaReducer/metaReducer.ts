import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import * as _ from 'lodash';

export const metaReducers:  MetaReducer<any>[] = [actionSaver];

export function actionSaver(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action: any) {
    if((action.type.includes('[Project] @ngrx/data/query-all/success') || 
       action.type.includes('[Land] @ngrx/data/query-all/success')) && 
       !isTheSameGet(state, action)){
      const newPast = insertGetAction(state.undoredo.history.past, action);
      state.undoredo = {
        ...state.undoRedo,
        history: {
          ...history,
          past: _.cloneDeep(newPast),
          // future: _.cloneDeep(state.undoredo.history.future)
          future: []
        },

        isInProgress: false
      };

    }else if(
      ((action.type.includes('[Router] Go') && !isTheSameRoute(action))||  
      action.type.includes('[Land Component] Add land Success') ||
      action.type.includes('[Land Component] Update land name Success') ||
      action.type.includes('[Project Component] Add project Success') ||
      action.type.includes('[Project Component] Update project name Success') ||
      action.type.includes('[Land Component] Remove land Success') ||
      action.type.includes('[Project Component] Remove project Success')
      ) && 
    !action.isUndoRedoOperation 
    // ||
    // action.type.includes('[Project] @ngrx/data/save/add-one/success')  ||
    // action.type.includes('[Project] @ngrx/data/save/update-one/success')
    ){
        const newPast = [...state.undoredo.history.past, action];
        state.undoredo = {
          ...state.undoRedo,
          history: {
            ...history,
            past: _.cloneDeep(newPast),
            //future:_.cloneDeep( state.undoredo.history.future)
            future: []
          },
          isInProgress: false
        };
   
    }
    
    return reducer(state, action);
  };
}

function insertGetAction(past: any[] , action: any): Array<any>{
  //  let test = past.splice(0,0,action);
  let newPast = [...past];
  newPast.splice(0,0,action);
  return newPast;
}

function isTheSameGet(state, action: any){
 let isTheSame = false
 state.undoredo.history.past.forEach(element => {
   if(element.type === action.type){
    isTheSame = true;
   }
 });
 return isTheSame;
}

function isTheSameRoute(action: any){
  return action.payload.navigatedFrom.path[0].includes(action.payload.navigatedTo.path[0]);
}