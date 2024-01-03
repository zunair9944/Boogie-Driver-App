import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatInboxPage } from './chat-inbox.page';

const routes: Routes = [
  {
    path: '',
    component: ChatInboxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatInboxPageRoutingModule {}
