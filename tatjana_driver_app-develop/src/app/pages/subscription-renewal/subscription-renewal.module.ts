import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// import { IonicModule } from '@ionic/angular';

import { SubscriptionRenewalPageRoutingModule } from './subscription-renewal-routing.module';

import { SubscriptionRenewalPage } from './subscription-renewal.page';
import { MODULES } from 'src/app/base.import';

@NgModule({
  imports: [
    // CommonModule,
    // FormsModule,
    // IonicModule,
    MODULES,
    SubscriptionRenewalPageRoutingModule
  ],
  declarations: [SubscriptionRenewalPage]
})
export class SubscriptionRenewalPageModule {}
