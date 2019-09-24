import { createSelector, createFeatureSelector } from '@ngrx/store';
import { LandState, initialState } from './state/land.model';
import { LandActions, LandActionTypes } from './land.action';

const getLandSelector = createFeatureSelector<LandState>('land');

export const getlands = createSelector(
    getLandSelector,
    state => state.landsColection
)

export function landReducer(state: LandState = initialState, action: LandActions ): LandState{
    switch (action.type){
        case LandActionTypes.GetLandsSuccess: 
            return {
                ...state,
                landsColection : action.payload
            }
        case LandActionTypes.GetLandsFail:
            return {
                ...state,
            }
        case LandActionTypes.UpdateLandNameSuccess:
            return {
                ...state,
                // landsColection : state.landsColection.map((item, index) =>{
                //     if (index !== action.payload.landId) {
                //         // This isn't the item we care about - keep it as-is
                //         item.landName = action.payload.landName;
                //         return item
                //       }
                //     // Otherwise, this is the one we want - return an updated value
                //     return {
                //         ...item,
                //         //landName : [action.payload.landName, ...item]
                //     }
                    
                // })
            }
        case LandActionTypes.UpdateLandNameFail:
            return {
                ...state,
            }

        case LandActionTypes.AddLandSuccess:
            return {
                ...state,
                landsColection: [...state.landsColection, action.payload]
            }
        
        case LandActionTypes.AddLandFail:
            return {
                ...state,
            }

        case LandActionTypes.RemoveLandSuccess:
            return {
                ...state,
                landsColection: [...state.landsColection.slice(0, action.payload)]
            }
        case LandActionTypes.RemoveLandFail:
            return {
                ...state,
            }
        default:
        return state;
    }
}