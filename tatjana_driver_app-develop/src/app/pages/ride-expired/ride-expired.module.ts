import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RideExpiredPageRoutingModule } from './ride-expired-routing.module';

import { RideExpiredPage } from './ride-expired.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RideExpiredPageRoutingModule,
    ComponentsModule
  ],
  declarations: [RideExpiredPage]
})
export class RideExpiredPageModule {}
