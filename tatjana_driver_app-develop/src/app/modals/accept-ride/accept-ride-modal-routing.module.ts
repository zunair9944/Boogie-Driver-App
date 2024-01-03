import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcceptRideModalPage } from './accept-ride-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AcceptRideModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcceptRideModalPageRoutingModule { }
