import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SixDigitCodePageRoutingModule } from './six-digit-code-routing.module';

import { SixDigitCodePage } from './six-digit-code.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SixDigitCodePageRoutingModule
  ],
  declarations: [SixDigitCodePage]
})
export class SixDigitCodePageModule {}
