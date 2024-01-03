import { CancelRideModalPage } from './../../modals/cancel-ride-modal/cancel-ride-modal.page';
import { CallingPage } from './../../modals/calling/calling.page';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-on-way',
  templateUrl: './on-way.page.html',
  styleUrls: ['./on-way.page.scss'],
})
export class OnWayPage implements OnInit {

  constructor(public modalController: ModalController) {}

  ngOnInit() {
  }
  async calcenRideModal() {
    const modal = await this.modalController.create({
      component: CancelRideModalPage,
      canDismiss:true,
      cssClass:'cancelRideModal',
      componentProps: {
        'model_title': "Nomadic model's reveberation"
      }
    });
    modal.onDidDismiss()
    return await modal.present();
  }

  async openCallingModal() {
    const modal = await this.modalController.create({
      component: CallingPage,
      cssClass:'callingModal',

    });
    modal.onDidDismiss()
    return await modal.present();
  }
}
