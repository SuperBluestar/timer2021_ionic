import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { LoadDataService } from '../load-data.service';
import { Store } from '@ngrx/store';
import { removeEvent } from '../timeevent.actions';

@Component({
  selector: 'app-remain-time',
  templateUrl: './remain-time.component.html',
  styleUrls: ['./remain-time.component.scss'],
})
export class RemainTimeComponent implements OnInit, OnChanges {

  @Input()
  datetime: string = "";
  @Input()
  eventid: number = -1;
  @Input()
  nowTime: Date;
  ngOnChanges(changes) {
    const seconds = Math.floor((+new Date(this.datetime) - +new Date()) / 1000);
    if (seconds > 0) {
      let hour = Math.floor(seconds/3600);
      let minute = Math.floor(seconds/3600);
      let sec = seconds%60;
      this.lastdatetime =  `${hour > 9 ? "" : "0"}${hour} : ${minute > 9 ? "" : "0"}${minute} : ${sec > 9 ? "" : "0"}${sec}`;
    } else {
      this.store.dispatch(removeEvent({
        id: this.eventid,
      }));
    }
  }
  lastdatetime: string = "";

  constructor(
    private loaddataservice: LoadDataService,
    private store: Store
  ) { }

  ngOnInit() {
  }

}
