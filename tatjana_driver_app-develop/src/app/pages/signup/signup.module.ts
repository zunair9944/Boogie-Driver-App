import { NgModule } from '@angular/core';
import { SignupPageRoutingModule } from './signup-routing.module';
import { SignupPage } from './signup.page';
import { MODULES } from 'src/app/base.import';

@NgModule({
  imports: [
    MODULES,
    SignupPageRoutingModule
  ],
  declarations: [SignupPage]
})
export class SignupPageModule {}
