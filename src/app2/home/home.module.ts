import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { OnePlanComponent } from '../one-plan/one-plan.component';
import { EventComponent } from '../event/event.component';
import { NgxMoveableModule, NgxMoveableComponent } from 'ngx-moveable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
  ],
  declarations: [ 
    HomePage, 
    OnePlanComponent, 
    EventComponent,
    NgxMoveableComponent
  ],
})
export class HomePageModule {}
