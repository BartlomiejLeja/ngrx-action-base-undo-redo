import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';

export const metaReducers:  MetaReducer<any>[] = [actionSaver];

export function actionSaver(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action: any) {
    // console.log('state', state);
    // console.log('action', action);
    if(action.type.includes('[Project] @ngrx/data/query-all/success') && !isTheSameGet(state, action)){
      const newPast = insertGetAction(state.undoredo.history.past, action);
      state.undoredo = {
        ...state.undoRedo,
        history: {
          ...history,
          past: newPast,
          future: state.undoredo.history.future
        },

        isInProgress: false
      };

    }else if(action.type.includes('[Router] Go') && !action.isUndoRedoOperation ){
        const newPast = [...state.undoredo.history.past, action];
        state.undoredo = {
          ...state.undoRedo,
          history: {
            ...history,
            past: newPast,
            future: state.undoredo.history.future
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