import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArrivedModalPage } from './arrived-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ArrivedModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArrivedModalPageRoutingModule { }
