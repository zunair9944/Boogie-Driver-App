import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArrivedPage } from './arrived.page';

const routes: Routes = [
  {
    path: '',
    component: ArrivedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArrivedPageRoutingModule {}
