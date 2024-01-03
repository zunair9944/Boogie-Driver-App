import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatInboxPageRoutingModule } from './chat-inbox-routing.module';

import { ChatInboxPage } from './chat-inbox.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatInboxPageRoutingModule
  ],
  declarations: [ChatInboxPage]
})
export class ChatInboxPageModule {}
