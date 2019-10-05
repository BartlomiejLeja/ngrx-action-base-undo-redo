import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LandState } from './state/land.model';

const getLandSelector = createFeatureSelector<LandState>('land');

export const getlands = createSelector(
    getLandSelector,
    state => state.landsColection
)
