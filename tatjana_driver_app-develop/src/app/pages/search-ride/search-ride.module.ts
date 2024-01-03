import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchRidePageRoutingModule } from './search-ride-routing.module';

import { SearchRidePage } from './search-ride.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchRidePageRoutingModule,
    ComponentsModule
  ],
  declarations: [SearchRidePage]
})
export class SearchRidePageModule {}
