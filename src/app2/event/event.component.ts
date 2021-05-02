import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { chooseEvent } from '../globalVar.actions';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit, OnChanges {

  @Input()
  reservedData: any;
  @Input()
  offsetY: String;
  @Input()
  planId: String;
  @Input()
  editingPlanId: String;
  @Input()
  editingEventId: String;
  @Input()
  dragingYTime: number;
  dragingYTimeLocal: number;

  ngOnChanges(changes) {
    if (this.eventId && this.editingEventId && this.planId && this.editingPlanId) {
      if (this.eventId == this.editingEventId && this.eventId == this.editingEventId) {
        this.editing = true;
      } else {
        this.editing = false;
      }
    }
  }

  private eventId: String;
  private title: String;
  // private reservedTime: Date;

  editingEvent$: Observable<any>;

  private datetime: string;
  private timetime: string;
  constructor(
    private store: Store<{ globalState: any, }>
  ) { 
  }

  ngOnInit() {
    let { id, title, reservedTime } = this.reservedData
    this.eventId = id;
    this.title = title;
    // this.reservedTime = reservedTime;
    let reservedDTime = reservedTime === "now" ? new Date() : new Date(reservedTime)
    this.datetime = `${reservedDTime.getDate()}/${reservedDTime.getMonth() + 1}`;
    this.timetime = `${reservedDTime.getHours()}:${reservedDTime.getMinutes()}:${reservedDTime.getSeconds()}`;
  }

  private editing: boolean = false;
  editTime(e) {
    if (this.planId != "-1") {
      if (this.eventId == this.editingEventId && this.eventId == this.editingEventId) {
        this.store.dispatch(chooseEvent({
          planId: "-1",
          eventId: "-1"
        }))
      } else {
        this.store.dispatch(chooseEvent({
          planId: this.planId,
          eventId: this.eventId
        }))
      }
    }
  }
}
