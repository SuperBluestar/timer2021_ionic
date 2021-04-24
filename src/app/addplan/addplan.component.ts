import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoadDataService } from '../load-data.service';

@Component({
  selector: 'app-addplan',
  templateUrl: './addplan.component.html',
  styleUrls: ['./addplan.component.scss'],
})
export class AddplanComponent implements OnInit {

  constructor(
    public modalController: ModalController,
    private loaddataservice: LoadDataService
  ) { }

  ngOnInit() {}

  Dismiss = () => {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  
  AddPlan = () => {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
