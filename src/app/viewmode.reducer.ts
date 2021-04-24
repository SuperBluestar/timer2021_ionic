import { createReducer, on } from '@ngrx/store';
import { toggleZoomMode } from './viewmode.actions';

export const initialState = {
    zoomMode: true,
};

const _viewmodeReducer = createReducer(
    initialState,
    on(toggleZoomMode, (state) => {
        return {
            ...state,
            zoomMode: !state.zoomMode,
        };
    }),
);

export function viewmodeReducer(state, action) {
  return _viewmodeReducer(state, action);
}