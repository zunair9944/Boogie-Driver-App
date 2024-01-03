import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SixDigitCodePage } from './six-digit-code.page';

const routes: Routes = [
  {
    path: '',
    component: SixDigitCodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SixDigitCodePageRoutingModule {}
