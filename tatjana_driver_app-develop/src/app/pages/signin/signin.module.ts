import { NgModule } from '@angular/core';
import { MODULES } from 'src/app/base.import';
import { SigninPageRoutingModule } from './signin-routing.module';
import { SigninPage } from './signin.page';

@NgModule({
  imports: [
    MODULES,
    SigninPageRoutingModule
  ],
  declarations: [SigninPage]
})
export class SigninPageModule {}
