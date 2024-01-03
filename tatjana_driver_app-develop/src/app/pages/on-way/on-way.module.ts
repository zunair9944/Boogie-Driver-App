import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnWayPageRoutingModule } from './on-way-routing.module';

import { OnWayPage } from './on-way.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnWayPageRoutingModule,
    ComponentsModule
  ],
  declarations: [OnWayPage]
})
export class OnWayPageModule {}
