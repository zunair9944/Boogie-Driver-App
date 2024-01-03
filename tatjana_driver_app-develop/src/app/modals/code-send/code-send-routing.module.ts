import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CodeSendPage } from './code-send.page';

const routes: Routes = [
  {
    path: '',
    component: CodeSendPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CodeSendPageRoutingModule {}
