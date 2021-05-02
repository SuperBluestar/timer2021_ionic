import { createReducer, on } from '@ngrx/store';
import { addPlan, addEvent, removeEvent, removePlan, editEvent_Drag, } from "./timeevent.actions";

let totalevents_saved = [
    {
        plan_id: "0",
        plan: "東京駅発まで 1",
        events: [
            { id: "0", title: "P1 - T1", reservedTime: "2021-04-30 21:15:46" },
            { id: "1", title: "P1 - T2", reservedTime: "2021-05-05 11:15:46" },
            { id: "2", title: "P1 - T3", reservedTime: "2021-05-02 19:15:46" },
        ]
    },
    {
        plan_id: "1",
        plan: "東京駅発まで 2",
        events: [
            { id: "0", title: "P2 - T1", reservedTime: "2021-05-01 21:25:46" },
            { id: "1", title: "P2 - T2", reservedTime: "2021-05-05 11:15:46" },
            { id: "2", title: "P2 - T3", reservedTime: "2021-05-02 19:15:46" },
        ]
    },
]

let totalevents_initial = []

// Remove passed days
let last_plan_id = ""
for (let plan of totalevents_saved) {
    let planTemp = {
        plan_id: plan.plan_id,
        plan: plan.plan,
        events: []
    };
    last_plan_id = plan.plan_id;
    for (let event of plan.events) {
        if (+(new Date(event.reservedTime)) - +(new Date()) > 0)
        {
            planTemp.events.push(event);
        }
    }
    totalevents_initial.push(planTemp)
}

// Add new plan page
totalevents_initial.push({
    plan_id: `${parseInt(last_plan_id)+1}`,
    plan: "New Plan",
    events: []
})

const _timeeventReducer = createReducer(
    totalevents_initial,
    on(addPlan, (state, param) => {
        return state;
    }),
    on(removePlan, (state, params) => {
        return state;
    }),
    on(addEvent, (state, params) => {
        return state;
    }),
    on(removeEvent, (state, params) => {
        return state;
    }),
    on(editEvent_Drag, (state, params) => {
        let newTotalEvent = [];
        for (let plan of state) {
            let planTemp = {
                plan_id: plan.plan_id,
                plan: plan.plan,
                events: []
            };
            for (let event of plan.events) {
                if (event.id == params.editingEventId && plan.id == params.editingPlanId) {
                    let deltaSecs = Math.floor(params.deltaYTime / 1000)
                    let newReservedTime = +(new Date(event.reservedTime)) + deltaSecs;
                    planTemp.events.push({
                        id: event.id,
                        title: "P2 - T3", 
                        reservedTime: newReservedTime
                    });
                } else {
                    planTemp.events.push(event);
                }
            }
            newTotalEvent.push(planTemp)
        }
        return newTotalEvent;
    }),
);

export function timeeventReducer(state, action) {
  return _timeeventReducer(state, action);
}