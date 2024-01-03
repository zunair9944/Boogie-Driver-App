import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CancelRideModalPageRoutingModule } from './cancel-ride-modal-routing.module';

import { CancelRideModalPage } from './cancel-ride-modal.page';
import { MODULES } from 'src/app/base.import';

@NgModule({
  imports: [
    // CommonModule,
    // FormsModule,
    // IonicModule,
    MODULES,
    CancelRideModalPageRoutingModule
  ],
  declarations: [CancelRideModalPage]
})
export class CancelRideModalPageModule {}
