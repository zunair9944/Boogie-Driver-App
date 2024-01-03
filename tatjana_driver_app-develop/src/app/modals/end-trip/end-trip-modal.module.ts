import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EndTripModalPageRoutingModule } from './end-trip-modal-routing.module';

import { EndTripModalPage } from './end-trip-modal.page';
import { CancelRideModalPageModule } from '../cancel-ride-modal/cancel-ride-modal.module';
import { CalcenRideModalPageModule } from '../calcen-ride-modal/calcen-ride-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EndTripModalPageRoutingModule,
    // CancelRideModalPageModule,
    CalcenRideModalPageModule
  ],
  declarations: [EndTripModalPage]
})
export class EndTripModalPageModule { }
