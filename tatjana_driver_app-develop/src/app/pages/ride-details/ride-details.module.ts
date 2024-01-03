import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RideDetailsPageRoutingModule } from './ride-details-routing.module';

import { RideDetailsPage } from './ride-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RideDetailsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [RideDetailsPage]
})
export class RideDetailsPageModule {}
