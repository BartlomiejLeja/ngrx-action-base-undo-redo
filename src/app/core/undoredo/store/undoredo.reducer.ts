import { StateHistory, initialStateHistory, History } from './state/undoredo.model';
import { UndoRedoActions, UndoRedoActionTypes } from './undoredo.action';
import * as _ from 'lodash';

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
      default:
        return state;
    }
  }