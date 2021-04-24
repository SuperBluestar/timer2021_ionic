import { createReducer, on } from '@ngrx/store';
import { setSlidePage } from './counter.actions';

export const initialPage = 0;

const _counterReducer = createReducer(
    initialPage,
    on(setSlidePage, (page, param) => {
        return param.page;
    }),
);

export function counterReducer(state, action) {
  return _counterReducer(state, action);
}