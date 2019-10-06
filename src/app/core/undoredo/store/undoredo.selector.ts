import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StateHistory } from './state/undoredo.model';
import { landReducer } from '../../../land/store/land.reducer';
import { projectReducer } from '../../../project/store/project.reducer';
import * as _ from 'lodash';

const getUndoRedoSelector = createFeatureSelector<StateHistory>('undoredo');

export const getPresentAction = createSelector(
  getUndoRedoSelector,
  state => state.history.past[state.history.past.length - 1]
)

export const getFututeAction = createSelector(
  getUndoRedoSelector,
  state => state.history.future[0]
)

export const checkIfPastHistoryExist = createSelector(
  getUndoRedoSelector,
  state => chceckIfUndoRedoPossible(state)
)

function chceckIfUndoRedoPossible (state){
    let isUndoRedoPossible = false;
    state.history.past.forEach(element => {
      if(!element.type.includes('Get')){
        isUndoRedoPossible = true;
      }
    });

    return isUndoRedoPossible;
}

export const chceckIfFutureHistoryExist = createSelector(
  getUndoRedoSelector,
  state => state.history.future.length > 0
)

export const getLastLandState = createSelector(
  getUndoRedoSelector,
  state => calculateLastLandState(state)
);

function calculateLastLandState(state: any): any{
  let lastLandState;

  for(
    let actionIndex = 0;
    actionIndex < state.history.past.length - 1;
    actionIndex++
  ){
    lastLandState = landReducer(
      _.cloneDeep(lastLandState),
      _.cloneDeep(state.history.past[actionIndex])
    );
  }
 
  return lastLandState.landsColection;
}


export const getLastProjectState = createSelector(
  getUndoRedoSelector,
  state => calculateLastProjectState(state)
)

function calculateLastProjectState(state: any): any{
  let lastProjectState;

  for(
    let actionIndex = 0;
    actionIndex < state.history.past.length - 1;
    actionIndex++
  ){
    lastProjectState = projectReducer(
      _.cloneDeep(lastProjectState),
      _.cloneDeep(state.history.past[actionIndex])
    );
  }
 
  return lastProjectState.projectsColection;
}