import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PickupRidePage } from './pickup-ride.page';

const routes: Routes = [
  {
    path: '',
    component: PickupRidePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PickupRidePageRoutingModule {}
