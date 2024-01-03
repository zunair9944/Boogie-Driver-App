import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArrivedModalPageRoutingModule } from './arrived-modal-routing.module';

import { ArrivedModalPage } from './arrived-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArrivedModalPageRoutingModule
  ],
  declarations: [ArrivedModalPage]
})
export class ArrivedModalPageModule { }
