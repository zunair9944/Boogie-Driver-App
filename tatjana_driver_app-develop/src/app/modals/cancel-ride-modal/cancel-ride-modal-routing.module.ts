import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CancelRideModalPage } from './cancel-ride-modal.page';

const routes: Routes = [
  {
    path: '',
    component: CancelRideModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CancelRideModalPageRoutingModule {}
