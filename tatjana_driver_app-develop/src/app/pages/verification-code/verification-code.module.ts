import { NgModule } from '@angular/core';
import { MODULES } from 'src/app/base.import';
import { VerificationCodePageRoutingModule } from './verification-code-routing.module';
import { VerificationCodePage } from './verification-code.page';

@NgModule({
  imports: [
    MODULES,
    VerificationCodePageRoutingModule
  ],
  declarations: [VerificationCodePage]
})
export class VerificationCodePageModule {}
