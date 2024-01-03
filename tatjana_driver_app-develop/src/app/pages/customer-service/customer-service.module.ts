import { NgModule } from '@angular/core';
import { MODULES } from 'src/app/base.import';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// import { IonicModule } from '@ionic/angular';

import { CustomerServicePageRoutingModule } from './customer-service-routing.module';

import { CustomerServicePage } from './customer-service.page';

@NgModule({
  imports: [
    // CommonModule,
    // FormsModule,
    // IonicModule,
    MODULES,
    CustomerServicePageRoutingModule
  ],
  declarations: [CustomerServicePage]
})
export class CustomerServicePageModule {}
