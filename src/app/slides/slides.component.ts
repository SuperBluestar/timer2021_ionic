import { Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { LoadDataService } from '../load-data.service';
import { IonSlides } from '@ionic/angular';
import { ModalController, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { addPlan } from '../timeevent.actions';
import { setSlidePage } from '../counter.actions';
import { CombineEP } from '../helpers/combine-ep';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss'],
})

export class SlidesComponent implements OnInit {

  @ViewChild(IonSlides) slides: IonSlides;
  @Input() nowTime: Date;

  timeevents$: Observable<Array<CombineEP>>;

  private slideOpts: object = {
    initialSlide: 0,
    speed: 400
  };

  constructor(
    private loaddataservice: LoadDataService, 
    public modalController: ModalController,
    public alertController: AlertController,
    private store: Store<{ 
      timeevent: Array<CombineEP>, 
    }>
  ) { 
    this.timeevents$ = store.select('timeevent');
  }

  ngOnInit() {
  }

  slideChanged(e) {
    e.slides.getActiveIndex().then(index => {
      this.store.dispatch(setSlidePage({page: index}));
    });
  }

  async addPlan() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'New Plan',
      inputs: [
        {
          name: 'planTitle',
          type: 'text',
          placeholder: 'Plan Title'
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
          handler: (e) => {

            this.store.dispatch(addPlan({title: e.planTitle}));
          }
        }
      ]
    });

    await alert.present();
  }

  
  @Output()
  editEvent: EventEmitter<string> = new EventEmitter<string>();
  parentEventHandler(param) {
    this.editEvent.emit(param);
  }
}
