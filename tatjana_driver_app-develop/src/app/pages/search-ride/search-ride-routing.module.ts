import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchRidePage } from './search-ride.page';

const routes: Routes = [
  {
    path: '',
    component: SearchRidePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchRidePageRoutingModule {}
