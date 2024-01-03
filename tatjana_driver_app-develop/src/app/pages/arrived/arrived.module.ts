import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArrivedPageRoutingModule } from './arrived-routing.module';

import { ArrivedPage } from './arrived.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArrivedPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ArrivedPage]
})
export class ArrivedPageModule {}
