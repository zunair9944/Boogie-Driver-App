import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CodeSendPageRoutingModule } from './code-send-routing.module';

import { CodeSendPage } from './code-send.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CodeSendPageRoutingModule
  ],
  declarations: [CodeSendPage]
})
export class CodeSendPageModule {}
