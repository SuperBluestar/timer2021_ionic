import { createReducer, on } from '@ngrx/store';
import { chooseEvent, } from "./globalVar.actions";

let globalaState = {
    editingEvent: { planId: "-1", eventId: "-1", title: "Template", reservedTime: "2021-05-01 21:25:46" }
};

const _globalStateReducer = createReducer(
    globalaState,
    on(chooseEvent, (state, param) => {
        state = {
            ...state,
            editingEvent: {
                ...state.editingEvent,
                planId: param.planId,
                eventId: param.eventId,
            }
        }
        return state;
    }),
);

export function globalStateReducer(state, action) {
  return _globalStateReducer(state, action);
}