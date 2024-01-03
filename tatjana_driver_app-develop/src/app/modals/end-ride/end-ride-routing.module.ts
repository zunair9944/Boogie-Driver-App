import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EndRidePage } from './end-ride.page';

const routes: Routes = [
  {
    path: '',
    component: EndRidePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EndRidePageRoutingModule {}
