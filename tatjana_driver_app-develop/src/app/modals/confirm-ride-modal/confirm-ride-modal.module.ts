import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmRideModalPageRoutingModule } from './confirm-ride-modal-routing.module';

import { ConfirmRideModalPage } from './confirm-ride-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmRideModalPageRoutingModule
  ],
  declarations: [ConfirmRideModalPage]
})
export class ConfirmRideModalPageModule {}
