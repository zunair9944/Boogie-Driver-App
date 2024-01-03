import { NgModule } from '@angular/core';
import { PersonalInfoRoutingModule } from './personal-info-routing.module';
import { PersonalInfoPage } from './personal-info.page';
import { MODULES } from 'src/app/base.import';

@NgModule({
  imports: [
    MODULES,
    PersonalInfoRoutingModule
  ],
  declarations: [PersonalInfoPage]
})
export class PersonalInfoModule {}
