import { StateHistory, initialStateHistory, History } from './state/undoredo.model';
import { UndoRedoActions, UndoRedoActionTypes } from './undoredo.action';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { projectReducer } from '../../../project/store/project.reducer';
import { landReducer } from '../../../land/store/land.reducer';

const getUndoRedoSelector = createFeatureSelector<StateHistory>('undoredo');

export const getPresentAction = createSelector(
  getUndoRedoSelector,
  state => state.history.past[state.history.past.length-1]
)

export const getFututeAction = createSelector(
  getUndoRedoSelector,
  state => state.history.future[0]
)

export const checkIfPastHistoryExist = createSelector(
  getUndoRedoSelector,
  state => chceckIfUndoRedoPossible(state)
)

export const chceckIfFutureHistoryExist = createSelector(
  getUndoRedoSelector,
  state => state.history.future.length > 0
)

export const getLastLandState = createSelector(
  getUndoRedoSelector,
  state => calculateLastLandState(state)
);

function calculateLastLandState(state: any): any{
  let lastLandState = landReducer(
    state.history.past[0].payload,
    state.history.past[0]
  );

  for(
    let actionIndex = 1;
    actionIndex < state.history.past.length - 1;
    actionIndex++
  ){
    lastLandState = landReducer(
      lastLandState,
      state.history.past[actionIndex]
    );
  }
 
  return lastLandState.landsColection;
}


export const getLastProjectState = createSelector(
  getUndoRedoSelector,
  state => calculateLastProjectState(state)
)

function calculateLastProjectState(state: any): any{
  let lastProjectState = projectReducer(
    state.history.past[0].payload,
    state.history.past[0]
  );

  for(
    let actionIndex = 1;
    actionIndex < state.history.past.length - 1;
    actionIndex++
  ){
    lastProjectState = projectReducer(
      lastProjectState,
      state.history.past[actionIndex]
    );
  }
 
  return lastProjectState.projectsColection;
}

function chceckIfUndoRedoPossible (state){
    let isUndoRedoPossible = false;
    state.history.past.forEach(element => {
      if(!element.type.includes('query-all')){
        isUndoRedoPossible = true;
      }
    });

    return isUndoRedoPossible;
}

function undo(state: any): History {
  const latestPast = state.past[state.past.length - 1]; // take last one
  const futureWithLatestPast = [latestPast, ...state.future]; 
  const pastWithoutLatest = state.past.slice(0, -1);

  return {
    past: pastWithoutLatest,
    future: futureWithLatestPast
  };
}


function redo(state: any): History {
  const [latestFuture, ...futureWithoutLatest] = state.future;
  const pastWithLatestFuture = [...state.past, latestFuture];

  return {
    ...state.history,
    past: pastWithLatestFuture,
    future: futureWithoutLatest
  };
}

export function undoRedoReducer(
    state: StateHistory = initialStateHistory,
    action: UndoRedoActions
  ): StateHistory {
    switch (action.type) {
      case UndoRedoActionTypes.UNDO:
        return {
          ...state,
          isInProgress: true
        };
      case UndoRedoActionTypes.REDO:
        return {
          ...state,
          isInProgress: true
        };
      case UndoRedoActionTypes.UNDOSuccess:
        return {
          ...state,
          history: undo(state.history),
          isInProgress: false
        };
      case UndoRedoActionTypes.REDOSuccess:
        return {
          ...state,
          history: redo(state.history),
          isInProgress: false
        };
      case UndoRedoActionTypes.UpdateUndoRedo:
        return {
          ...state,
          history: {
            past: action.payload,
            future: []
          }
        };
      // case UndoRedoActionTypes.ClearHistory:
      //   return {
      //     ...state,
      //     history: clearHistory(state.history)
      //   };
      default:
        return state;
    }
  }