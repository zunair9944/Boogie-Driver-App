import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// import { IonicModule } from '@ionic/angular';

import { CardModalPageRoutingModule } from './card-modal-routing.module';

import { CardModalPage } from './card-modal.page';
import { MODULES } from 'src/app/base.import';
// import { MODULES } from 'src/app/base.import';

@NgModule({
  imports: [
    // CommonModule,
    // FormsModule,
    // IonicModule,
    // MODULES,
    MODULES,
    CardModalPageRoutingModule
  ],
  declarations: [CardModalPage]
})
export class CardModalPageModule {}
