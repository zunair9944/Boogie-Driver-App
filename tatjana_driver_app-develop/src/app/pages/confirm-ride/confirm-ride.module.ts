import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmRidePageRoutingModule } from './confirm-ride-routing.module';

import { ConfirmRidePage } from './confirm-ride.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmRidePageRoutingModule,
    ComponentsModule
  ],
  declarations: [ConfirmRidePage]
})
export class ConfirmRidePageModule {}
