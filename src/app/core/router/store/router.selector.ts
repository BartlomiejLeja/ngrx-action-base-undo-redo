import { RouterState } from '@ngrx/router-store';
import { createFeatureSelector } from '@ngrx/store';

export const getRouterSelector = createFeatureSelector<RouterState>('routing')