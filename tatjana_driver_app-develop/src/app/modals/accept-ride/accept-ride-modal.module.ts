import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcceptRideModalPageRoutingModule } from './accept-ride-modal-routing.module';

import { AcceptRideModalPage } from './accept-ride-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AcceptRideModalPageRoutingModule
  ],
  declarations: [AcceptRideModalPage]
})
export class AcceptRideModalPageModule { }
