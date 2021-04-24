import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

import { SlidesComponent } from '../slides/slides.component';
import { RemainTimeComponent } from '../remain-time/remain-time.component';
import { EventComponent } from '../event/event.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [
    HomePage,
    SlidesComponent, 
    RemainTimeComponent, 
    EventComponent, 
  ]
})
export class HomePageModule {}
