import { Component, Input, OnInit, OnChanges, EventEmitter, Output } from '@angular/core';
import { LoadDataService } from '../load-data.service';
import { AlertController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { removeEvent, togglePS } from '../timeevent.actions';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit, OnChanges {

  private title: string = "";
  private date: string = "";
  private time: string = "";
  private marginTop: string = "0px";
  private marginTop_gaptime: string = "0px";
  private gap_date: string = "";
  private gap_time: string = "";
  private id: number = -1;
  private isFirstItem: boolean = false;
  private ps: boolean = false;

  @Input()
  eventdata: any = {};
  @Input()
  totallist: any = "";

  @Input()
  nowTime: Date;
  private datetime: Date;
  private prevtime: Date;
  private zoomViewMode: boolean;

  constructor(
    private loaddataservice: LoadDataService, 
    public alertController: AlertController,
    private store: Store<{ viewmode }>
  ) { 
    store.select('viewmode').subscribe(val => {
      this.zoomViewMode = val.zoomMode;
      this.showLayout();
    });
  }

  ngOnChanges(changes) {
    // console.log(":A")
    if (this.eventdata.key == 1) {
      let hour = Math.floor((+this.datetime - +this.nowTime) / 1000 / 3600 % 24);
      let minute = Math.floor((+this.datetime - +this.nowTime) / 1000 / 60 % 60);
      let sec = Math.floor((+this.datetime - +this.nowTime) / 1000 % 60);
      this.gap_time = `${hour > 10 ? "" : "0"}${hour} : ${minute > 10 ? "" : "0"}${minute} : ${sec > 10 ? "" : "0"}${sec}`;
    }
    if (this.eventdata.key == 0) {
      // console.log(new Date(this.nowTime).getDate())
      this.date = `${new Date(this.nowTime).getMonth() + 1} / ${new Date(this.nowTime).getDate()}`;
      let hour = new Date(this.nowTime).getHours();
      let minute = new Date(this.nowTime).getMinutes();
      let sec = new Date(this.nowTime).getSeconds();
      this.time = `${hour > 10 ? "" : "0"}${hour} : ${minute > 10 ? "" : "0"}${minute} : ${sec > 10 ? "" : "0"}${sec}`;
    }
  }

  showLayout() {
    if (this.id == -1) {
      return;
    }
    if (this.zoomViewMode) {
      const seconds = Math.floor((+this.datetime - +this.prevtime) / 1000);
      this.marginTop = `${Math.min(seconds / 432, 5300)}px`;
      this.marginTop_gaptime = `${Math.min(seconds / 432, 5300) / 2 - 8}px`;
      let datte = Math.floor((+this.datetime - +this.prevtime) / 1000 / 3600 / 24);
      this.gap_date = datte === 0 ? "" : `${datte}d`;
      let hour = Math.floor((+this.datetime - +this.prevtime) / 1000 / 3600 % 24);
      let minute = Math.floor((+this.datetime - +this.prevtime) / 1000 / 60 % 60);
      let sec = Math.floor((+this.datetime - +this.prevtime) / 1000 % 60);
      this.gap_time = `${hour > 10 ? "" : "0"}${hour} : ${minute > 10 ? "" : "0"}${minute} : ${sec > 10 ? "" : "0"}${sec}`;
    } else {
      this.marginTop = "20px";
      this.marginTop_gaptime = "2px";
    }
  }

  ngOnInit() {
    this.id = this.eventdata.value.id;
    this.ps = this.eventdata.value.ps;
    if (this.eventdata.key === "0") this.isFirstItem = true;
    this.datetime = new Date(this.eventdata.value.datetime);
    this.prevtime = new Date();
    if (this.eventdata.key > 0) {
      this.prevtime = new Date(this.totallist[this.eventdata.key - 1].datetime)
    }
    this.title = this.eventdata.value.title;
    this.date = `${this.datetime.getMonth() + 1} / ${this.datetime.getDate()}`;
    let hour = this.datetime.getHours();
    let minute = this.datetime.getMinutes();
    let sec = this.datetime.getSeconds();
    this.time = `${hour > 10 ? "" : "0"}${hour} : ${minute > 10 ? "" : "0"}${minute} : ${sec > 10 ? "" : "0"}${sec}`;
    
    this.showLayout();
  }

  @Output()
  editEvent: EventEmitter<string> = new EventEmitter<string>();

  editEventPrompt() {
    if (this.id == -1) {
      return;
    }
    this.editEvent.emit(this.eventdata);
  }

  async removeEvent() {
    if (this.id == -1) {
      return;
    }
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Delete event?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (e) => {
          }
        }, {
          text: 'Ok',
          handler: (e: any) => {
            this.store.dispatch(removeEvent({
              id: this.id,
            }));
            return true;
          }
        }
      ]
    });
    await alert.present();
  }

  addPS = () => {
    if (this.id != -1) {
      this.store.dispatch(togglePS({
        id: this.id,
      }));
    }
  }

}
