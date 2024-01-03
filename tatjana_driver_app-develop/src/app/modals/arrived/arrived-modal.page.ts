import { Component, Injector, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';

@Component({
  selector: 'app-arrived-modal',
  templateUrl: './arrived-modal.page.html',
  styleUrls: ['./arrived-modal.page.scss'],
})
export class ArrivedModalPage implements OnInit {

  data: any;

  constructor(injector: Injector, private modalController: ModalController, private callNumber: CallNumber) { }

  ngOnInit() {
    console.log("===>", this.data);
  }


  async callRider(number: string) {
    console.log('calling..' + number);

    await this.callNumber.callNumber(number, true)
      .then(r => console.log('Launched dialer!', r))
      .catch(e => console.log('Error launching dialer', e));
  }

  handleOpenChatPage() {
    // @todo open chat page
    console.log('handleOpenChatPage');
  }

  async handleArrived() {
    console.log('handleArrived');
    this.modalController.dismiss();

  }

}
