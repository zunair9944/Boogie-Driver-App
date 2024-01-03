import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RideExpiredPage } from './ride-expired.page';

const routes: Routes = [
  {
    path: '',
    component: RideExpiredPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RideExpiredPageRoutingModule {}
