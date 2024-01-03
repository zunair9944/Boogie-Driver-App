import { Component, OnInit } from '@angular/core';
import { ModalController ,AnimationController} from '@ionic/angular';
import { EndRidePage } from 'src/app/modals/end-ride/end-ride.page';
@Component({
  selector: 'app-arrived',
  templateUrl: './arrived.page.html',
  styleUrls: ['./arrived.page.scss'],
})
export class ArrivedPage implements OnInit {

  constructor(public modalController: ModalController) {}

  ngOnInit() {
  }
  async endRide() {
    const modal = await this.modalController.create({
      component: EndRidePage,
      cssClass:'cancelRideModal',
      componentProps: {
        'model_title': "Nomadic model's reveberation"
      }
    });
    modal.onDidDismiss()
    return await modal.present();
  }


}
