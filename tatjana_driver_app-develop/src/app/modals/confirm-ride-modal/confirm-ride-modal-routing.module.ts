import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmRideModalPage } from './confirm-ride-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmRideModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmRideModalPageRoutingModule {}
