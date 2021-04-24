import { Injectable } from '@angular/core';
import { Plan } from './helpers/plan';
import { CombineEP } from './helpers/combine-ep';
import { Event } from './helpers/event';

@Injectable({
  providedIn: 'root'
})

export class LoadDataService {

  // private planlist: Plan[] = [
  //   { id: "1", title: "Plan 1" },
  //   { id: "2", title: "Plan 2" },
  //   { id: "3", title: "Plan 3" },
  // ];
  
  // private eventlist: Event[] = [
  //   { id: "1", title: "Class1", datetime: "4/21/2021 20:42:40", planId: "1", ps: true },
  //   { id: "2", title: "Class1", datetime: "4/22/2021 20:32:40", planId: "2", ps: false },
  //   { id: "3", title: "Class1", datetime: "4/22/2021 21:32:40", planId: "3", ps: true },
  //   { id: "4", title: "Class1", datetime: "5/21/2021 22:22:40", planId: "2", ps: true },
  //   { id: "5", title: "Class1", datetime: "4/24/2021 22:22:40", planId: "2", ps: false },
  //   { id: "6", title: "Class1", datetime: "4/22/2021 12:30:40", planId: "3", ps: false },
  //   { id: "7", title: "Class1", datetime: "4/23/2021 08:52:40", planId: "3", ps: false },
  //   { id: "8", title: "Class1", datetime: "4/22/2021 22:42:40", planId: "1", ps: false },
  // ];
  // public data: Array<CombineEP> = [];
  private zoommode: Boolean = true;
  private page: number = 0;

  constructor() { 
    // this.loadData();
  }

  // loadData () {
  //   // this.eventlist.sort((a: Event, b: Event): number => {
  //   //     return +(new Date(a.datetime)) - +(new Date(b.datetime));
  //   // });
  //   // this.planlist.sort((a: Plan, b: Plan): number => {
  //   //   return +a.id - +b.id;
  //   // });
  //   for (let i = 0; i < this.planlist.length; i ++) {
  //     this.data[i] = { plan: this.planlist[i].title, list: [] };
  //     for (let j = 0; j < this.eventlist.length; j ++) {
  //       if (this.eventlist[j].planId === this.planlist[i].id)
  //       {
  //         this.data[i].list.push(this.eventlist[j]);
  //       }
  //     }
  //   }
  // }

  // getPlans(): Array<any> {
  //   return this.data;
  // }

  // addEventToPlan(): Boolean {
  //   // console.log(e)
  //   return true;
  // }

  getViewMode(): Boolean {
    return this.zoommode;
  }

  toggleViewMode() {
    this.zoommode = !this.zoommode;
  }

  // removeEvent(n: number) {
  //   this.eventlist = this.eventlist.filter(event => {
  //     if (event.id === `${n}`) return false;
  //     else return true;
  //   })
  //   // this.data[0].list.pop();
  //   // this.loadData();
  // }

  setSlidesPage(page: number) {
    this.page = page;
  }

  getSlidesPage(): number {
    return this.page;
  }

  // getPlanId(): string {
  //   if (this.page < this.planlist.length)
  //     return this.planlist[this.page].id;
  //   return "-1"
  // }

  // addPlan(title: string) {
  //   this.planlist.push({
  //     id: `${parseInt(this.planlist[this.planlist.length - 1].id) + 1}`,
  //     title: title
  //   })
  //   // this.loadData();
  //   this.data.push({
  //     plan: title,
  //     list: [],
  //   });
  // }

  // removePlan(id: string) {
  //   this.planlist = this.planlist.filter(plan => {
  //     if (plan.id === `${id}`) return false;
  //     else return true;
  //   })
  //   // this.loadData();
  // }
}
