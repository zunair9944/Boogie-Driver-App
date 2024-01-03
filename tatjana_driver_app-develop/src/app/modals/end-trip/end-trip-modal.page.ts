import { Component, Injector, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { BasePage } from 'src/app/base.page';
import { CancelRideModalPage } from '../cancel-ride-modal/cancel-ride-modal.page';
import { EndRidePage } from '../end-ride/end-ride.page';
import { CalcenRideModalPage } from '../calcen-ride-modal/calcen-ride-modal.page';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-end-trip-modal',
  templateUrl: './end-trip-modal.page.html',
  styleUrls: ['./end-trip-modal.page.scss'],
})
export class EndTripModalPage extends BasePage implements OnInit {

  @Input() drawRoute: any;
  @Input() removRoute: any;
  @Input() notify:any;
  data: any;
  modelData: any;
  constructor(injector: Injector, private modalController: ModalController, private callNumber: CallNumber) { super(injector) }

  ngOnInit() {
    console.log("===>", this.data);
  }


  async callRider(number: string) {
    console.log('calling..' + number);

    await this.callNumber.callNumber(number, true)
      .then(r => console.log('Launched dialer!', r))
      .catch(e => console.log('Error launching dialer', e));
  }

  async handleOpenChatPage() {
    // @todo open chat page

    this.modalCtrl.dismiss();

    const navExtras: NavigationExtras = {
      state: {
        data: { to_user: this.data.riderData, rider_id: this.data.rider_id, backRoute: '/home' }
      }
    };
    this.cache.store('messenger_id', this.data.rider_id);
    this.router.navigateByUrl('chat', navExtras)

  }

  async handleDriverEndTrip() {
    console.log('handleDriverEndTrip');
    const modal = await this.modalController.create({
      component: CalcenRideModalPage, //CancelRideModalPage,
      id: 'acceptRidemodal',
      componentProps: { data: this.data, removRoute: this.removRoute.bind(this), drawRoute: this.drawRoute.bind(this) },
      cssClass: 'cancelRideModal'
    });
    modal.onDidDismiss().then((response: any) => {
      // this.openArrivedModal(data);
      // this.openEndTripModal(data);
      if (response.data && response.data.isEnded) {
        this.modalCtrl.dismiss();
        this.removRoute();
        this.showRidePriceModal(response.data.rideResp);
        this.notify()
      }
    });
    return await modal.present();
  }

  async showRidePriceModal(data: any) {
    const modal = await this.modalController.create({
      component: EndRidePage,
      cssClass: 'cancelRideModal',
      componentProps: {
        'model_title': "Nomadic model's reveberation",
        data
      }
    });
    modal.onDidDismiss().then((modelData) => {
      if (modelData !== null) {
        this.modelData = modelData.data;
        console.log('Modal Data : ' + modelData.data);
      }

    });
    return await modal.present();
  }
}
