import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { LoadDataService } from '../load-data.service';
import { ModalController, AlertController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { addEvent, editEvent, removePlan } from '../timeevent.actions';
import { toggleZoomMode } from '../viewmode.actions';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  public nowTime: Date;
  public currentSlidePage$: number;

  constructor(
    private router: Router, 
    private loaddataservice: LoadDataService, 
    public modalController: ModalController,
    public alertController: AlertController,
    private store: Store<{ count: number }>
  ) {
    store.select('count').subscribe(val => {
      this.currentSlidePage$ = val
    });
    setInterval(() => {
      this.nowTime = new Date();
    }, 1000);
  }

  toggleView = () => {
    this.store.dispatch(toggleZoomMode());
  }

  // openAddEventModal = async () => {
  //   let id = this.loaddataservice.getPlanId();
  //   if (parseInt(id) > -1) {
  //     const modal = await this.modalController.create({
  //       component: AddeventComponent,
  //       cssClass: 'my-custom-class',
  //       componentProps: {
  //         'mode': 'add',
  //         'planId': id,
  //       }
  //     });
  //     return await modal.present();
  //   }
  // }

  deletePlanModal = async () => {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Really',
      subHeader: 'Do you want to delete',
      message: 'Do you want to delete',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (e) => {
          }
        }, {
          text: 'Yes',
          handler: (e) => {
            this.store.dispatch(removePlan({page: this.currentSlidePage$}));
          }
        }
      ]
    });

    await alert.present();
  }

  async newEvent() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Add Event',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Title of plan'
        },
        {
          name: 'newDate',
          type: 'date',
          placeholder: '00-00-0000'
        },
        {
          name: 'newTime',
          type: 'time',
          placeholder: '00:00:00'
        },
      ],
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
            if (e.title === "" || e.newDate === "" || e.newTime === "") {
              return false;
            } else {
              this.store.dispatch(addEvent({
                page: this.currentSlidePage$,
                title: e.title,
                datetime: `${e.newDate} ${e.newTime}:${Math.floor(Math.random() * 60)}`
              }));
              return true;
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async eventEditHandler(param) {
    let id = (param.value.id);
    let datetime = new Date(param.value.datetime);
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Edit Event',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Title of plan',
          value: param.value.title,
        },
        {
          name: 'newDate',
          type: 'date',
          // placeholder: '00-00-0000',
          // value: datetime.toString(),
          value: `${datetime.getMonth()}/${datetime.getDate()}/${datetime.getFullYear()}`,
        },
        {
          name: 'newTime',
          type: 'time',
          placeholder: '00:00:00',
          value: param.value.title,
        },
      ],
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
            if (e.title === "" || e.newDate === "" || e.newTime === "") {
              return false;
            } else {
              let params = {
                id: id,
                title: e.title,
                datetime: `${e.newDate} ${e.newTime}:${Math.floor(Math.random() * 60)}`,
              }
              this.store.dispatch(editEvent(params));
              return true;
            }
          }
        }
      ]
    });
    await alert.present();
  }
}
