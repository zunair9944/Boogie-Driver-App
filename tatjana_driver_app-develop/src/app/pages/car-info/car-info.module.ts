import { NgModule } from '@angular/core';
import { CarInfoPageRoutingModule } from './car-info-routing.module';
import { CarInfoPage } from './car-info.page';
import { MODULES } from 'src/app/base.import';

@NgModule({
  imports: [
    MODULES,
    CarInfoPageRoutingModule
  ],
  declarations: [CarInfoPage]
})
export class CarInfoModule {}
