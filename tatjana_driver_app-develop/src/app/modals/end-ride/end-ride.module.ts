import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EndRidePageRoutingModule } from './end-ride-routing.module';

import { EndRidePage } from './end-ride.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EndRidePageRoutingModule
  ],
  declarations: [EndRidePage]
})
export class EndRidePageModule {}
