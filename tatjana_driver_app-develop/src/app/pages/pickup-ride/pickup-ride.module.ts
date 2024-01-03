import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PickupRidePageRoutingModule } from './pickup-ride-routing.module';

import { PickupRidePage } from './pickup-ride.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PickupRidePageRoutingModule,
    ComponentsModule
  ],
  declarations: [PickupRidePage]
})
export class PickupRidePageModule {}
