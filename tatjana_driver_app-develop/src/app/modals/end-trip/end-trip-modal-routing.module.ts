import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EndTripModalPage } from './end-trip-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EndTripModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EndTripModalPageRoutingModule { }
