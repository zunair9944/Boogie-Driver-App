import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RideDetailsPage } from './ride-details.page';

const routes: Routes = [
  {
    path: '',
    component: RideDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RideDetailsPageRoutingModule {}
