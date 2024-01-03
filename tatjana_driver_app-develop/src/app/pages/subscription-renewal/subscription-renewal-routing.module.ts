import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubscriptionRenewalPage } from './subscription-renewal.page';

const routes: Routes = [
  {
    path: '',
    component: SubscriptionRenewalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscriptionRenewalPageRoutingModule {}
