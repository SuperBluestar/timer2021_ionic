import { createAction } from '@ngrx/store';

export const addPlan = createAction('[TimeEvent Component] addPlan', (param) => (param));
export const removePlan = createAction('[TimeEvent Component] removePlan', (param) => (param));
export const addEvent = createAction('[TimeEvent Component] addEvent', (param) => (param));
export const removeEvent = createAction('[TimeEvent Component] removeEvent', (param) => (param));
export const editEvent_Drag = createAction('[TimeEvent Component] editEventDrag', (param) => (param));
