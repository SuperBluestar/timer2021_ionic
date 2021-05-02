import { createReducer, on } from '@ngrx/store';
import { addPlan, addEvent, removeEvent, removePlan, editEvent, togglePS } from "./timeevent.actions";
import { Plan } from './helpers/plan';
import { CombineEP } from './helpers/combine-ep';
import { Event } from './helpers/event';

let planlist: Plan[] = [
    { id: "1", title: "Plan 1" },
    { id: "2", title: "Plan 2" },
    { id: "3", title: "Plan 3" },
];

let eventlist: Event[] = [
    { id: "1", title: "Event 1", datetime: "2021-04-25 21:15:46", planId: "1", ps: false },
    { id: "2", title: "Event 2", datetime: "2021-04-26 22:30:40", planId: "1", ps: true },
    { id: "3", title: "Event 3", datetime: "2021-04-27 21:32:40", planId: "1", ps: false },
    { id: "4", title: "Event 5", datetime: "2021-05-3 21:15:46", planId: "2", ps: false },
    { id: "5", title: "Event 6", datetime: "2021-04-29 22:30:40", planId: "2", ps: true },
    { id: "10", title: "Event 4", datetime: "2021-04-27 21:32:40", planId: "1", ps: false },
    { id: "6", title: "Event 7", datetime: "2021-04-29 21:32:40", planId: "2", ps: false },
    { id: "7", title: "Event 8", datetime: "2021-04-27 21:32:40", planId: "2", ps: false },
    { id: "8", title: "Event 9", datetime: "2021-05-15 21:15:46", planId: "3", ps: false },
    { id: "9", title: "Event 10", datetime: "2021-04-26 22:30:40", planId: "3", ps: true },
    { id: "10", title: "Event 11", datetime: "2021-04-25 20:00:00", planId: "2", ps: false },
    { id: "11", title: "Event 12", datetime: "2021-04-25 18:30:00", planId: "2", ps: false },
    { id: "12", title: "Event 13", datetime: "2021-04-25 22:30:00", planId: "2", ps: true },
];

let data: Array<CombineEP> = [];

const loadData = () => {
    data = [];
    eventlist.sort((a: Event, b: Event): number => {
        return +(new Date(a.datetime)) - +(new Date(b.datetime));
    });
    planlist.sort((a: Plan, b: Plan): number => {
      return +a.id - +b.id;
    });
    for (let i = 0; i < planlist.length; i ++) {
        data[i] = { plan: planlist[i].title, list: [
            {id: `-1`, title: "現在の時刻", datetime: `${new Date()}`, planId: `${planlist[i].id}`, ps: false },
        ] };
        for (let j = 0; j < eventlist.length; j ++) {
            if (eventlist[j].planId === planlist[i].id)
            {
                data[i].list.push(eventlist[j]);
            }
        }
    }
    return data;
}

loadData();

export const initialState = data;

const _timeeventReducer = createReducer(
    initialState,
    on(addPlan, (state, param) => {
        planlist.push({
            id: `${parseInt(planlist[planlist.length - 1].id) + 1}`,
            title: param.title
        })
        let temp = loadData();
        return temp;
    }),
    on(removePlan, (state, params) => {
        let planlist_temp = planlist.filter((plan) => {
            if (plan.id === `${params.page + 1}`) {
                return false;
            } else {
                return true;
            }
        })
        planlist = planlist_temp;
        let temp = loadData();
        return temp;
    }),
    on(addEvent, (state, params) => {
        console.log(params)
        eventlist.push({
            id: `${parseInt(eventlist[eventlist.length - 1].id) + 1}`,
            title: params.title,
            datetime: params.datetime,
            planId: `${params.page + 1}`,
            ps: false,
        });
        let temp = loadData();
        return temp;
    }),
    on(editEvent, (state, params) => {
        let eventlist_temp = eventlist.map(event => {
            if (event.id === params.id) {
                return {
                    ...event,
                    id: params.id,
                    title: params.title,
                    datetime: params.datetime,
                }
            } else {
                return event;
            }
        })
        eventlist = eventlist_temp;
        let temp = loadData();
        return temp;
    }),
    on(removeEvent, (state, params) => {
        let eventlist_temp = eventlist.filter((event) => {
            if (event.id === `${params.id}`) {
                return false;
            } else {
                return true;
            }
        })
        eventlist = eventlist_temp;
        let temp = loadData();
        return temp;
    }),
    on(togglePS, (state, params) => {
        let eventlist_temp = eventlist.map((event) => {
            return {
                ...event,
                ps: event.id === params.id ? !event.ps : event.ps,
            }
        })
        eventlist = eventlist_temp;
        let temp = loadData();
        return temp;
    }),
);

export function timeeventReducer(state, action) {
  return _timeeventReducer(state, action);
}