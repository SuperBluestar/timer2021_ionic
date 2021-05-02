import { Component, Input, OnInit, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { editEvent_Drag } from '../timeevent.actions';

@Component({
  selector: 'app-one-plan',
  templateUrl: './one-plan.component.html',
  styleUrls: ['./one-plan.component.scss'],
})
export class OnePlanComponent implements OnInit {

  @Input()
  splan: any;

  title: string;
  events: Array<any>;
  plan_id: string;

  x: String = "100";

  private editingPlanId: string = "-1";
  private editingEventId: string = "-1";
  constructor( 
    private store: Store<{ globalState: any, }>
  ) {
    store.select('globalState').subscribe(({editingEvent}) => {
      this.editingPlanId = editingEvent.planId;
      this.editingEventId = editingEvent.eventId;
    });
  }

  ngOnInit() {
    this.title = this.splan.plan;
    this.events = this.splan.events;
    this.plan_id = this.splan.plan_id
  }

  ngAfterViewInit() {
  }

  calculateTop(e) {
    let seconds = +(new Date(e.reservedTime)) - +(new Date());
    return `${Math.floor(seconds / 500000)}px`;
  }

  private startX: number = 0; 
  private startY: number = 0;
  private currentX: number = 0; 
  private currentY: number = 0;
  private dragging: boolean = false;
  private deltaX: number = 0;
  private deltaY: number = 0;

  private startXTime: number = 0; 
  private startYTime: number = 0;
  private deltaXTime: number = 0;
  private deltaYTime: number = 0;
  onTouchStart(e) {
    if (this.editingPlanId == "-1" && this.editingEventId == "-1") {
      let touchobj = e.changedTouches[0]
      this.startX = touchobj.pageX;
      this.startY = touchobj.pageY;
      this.dragging = true;
    } else {
      let touchobj = e.changedTouches[0]
      this.startXTime = touchobj.pageX;
      this.startYTime = touchobj.pageY;
      this.dragging = true;
    }
  }
  onTouchMove(e) {
    if (this.dragging) {
      if (this.editingPlanId == "-1" && this.editingEventId == "-1") {
        if ((this.currentY + this.deltaY) <= 0) {
          let touchobj = e.changedTouches[0]
          this.deltaX = touchobj.pageX - this.startX;
          this.deltaY = touchobj.pageY - this.startY;
        }
      } else {
        let touchobj = e.changedTouches[0]
        this.deltaXTime = touchobj.pageX - this.startXTime;
        this.deltaYTime = touchobj.pageY - this.startYTime;
        this.store.dispatch(editEvent_Drag({
          deltaYTime: this.deltaYTime,
          editingPlanId: this.editingPlanId,
          editingEventId: this.editingEventId,
        }));
      }
    }
  }
  onTouchEnd(e) {
    if (this.dragging) {
      if (this.editingPlanId == "-1" && this.editingEventId == "-1") {
        if ((this.currentY + this.deltaY) <= 0) {
          let touchobj = e.changedTouches[0]
          this.deltaX = touchobj.pageX - this.startX;
          this.deltaY = touchobj.pageY - this.startY;
          this.currentX += this.deltaX;
          this.currentY += this.deltaY;
          this.deltaX = 0;
          this.deltaY = 0;
          this.dragging = false;
        } else {
          this.currentX = 0;
          this.currentY = 0;
          this.deltaX = 0;
          this.deltaY = 0;
        }
      } else {
        let touchobj = e.changedTouches[0]
        this.deltaXTime = touchobj.pageXTime - this.startXTime;
        this.deltaYTime = touchobj.pageYTime - this.startYTime;
        this.store.dispatch(editEvent_Drag({
          deltaYTime: this.deltaYTime,
          editingPlanId: this.editingPlanId,
          editingEventId: this.editingEventId,
        }));
        this.deltaXTime = 0;
        this.deltaYTime = 0;
        this.dragging = false;
      }
    }
  }
}
