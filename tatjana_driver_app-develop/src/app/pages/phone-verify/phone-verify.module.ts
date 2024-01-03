import { NgModule } from '@angular/core';
import { PhoneVerifyPageRoutingModule } from './phone-verify-routing.module';
import { PhoneVerifyPage } from './phone-verify.page';
import { MODULES } from 'src/app/base.import';

@NgModule({
  imports: [
    MODULES,
    PhoneVerifyPageRoutingModule
  ],
  declarations: [PhoneVerifyPage]
})
export class PhoneVerifyPageModule {}
