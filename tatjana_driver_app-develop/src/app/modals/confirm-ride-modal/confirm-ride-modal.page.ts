import { Component, Injector, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BasePage } from 'src/app/base.page';
import { PusherService } from 'src/app/services/pusher/pusher.service';

@Component({
  selector: 'app-confirm-ride-modal',
  templateUrl: './confirm-ride-modal.page.html',
  styleUrls: ['./confirm-ride-modal.page.scss'],
})
export class ConfirmRideModalPage extends BasePage {

  @Input() data: any;
  ride_request_id: any;
  driver_id: any;
  profile_image: any;
  name: any;
  distance: any;
  pickup_distance: any;
  pickup_address: any;
  dropoff_address: any;
  dropoff_distance: any;
  base_fare: any;
  time: any;
  showAcceptSpin: boolean = false;
  showDecSpin: boolean = false;
  noResponse = false;
  acceptSubimitted: any = false;
  constructor(private pusherService: PusherService, injector: Injector, private modalController: ModalController) { super(injector) }

  ngOnInit() {
  }

  ionViewWillEnter(): void {
      setTimeout(()=>{ 
        if(!this.noResponse){
          document.getElementById("confirmRidemodal")?.remove();
        }
      },  5000)
    this.time = this.data.time;
    this.name = this.data.driverData.name;
    this.dropoff_address = this.data.dropoff_address;
    this.distance = this.data.distance;
    this.dropoff_distance = this.data.dropoff_distance;
    this.base_fare = this.data.base_fare;
    this.pickup_distance = this.data.pickup_distance;
    this.pickup_address = this.data.pickup_address;
    this.profile_image = this.data.driverData.profile_image;
    this.driver_id = this.data.driver_id;
    this.ride_request_id = this.data.requestId;
  }

  async acceptRide(accepted: any) {
    try {
      if(this.acceptSubimitted){
        return
      }
      this.acceptSubimitted = true;
      this.noResponse = true;
      accepted ? this.showAcceptSpin = true : this.showDecSpin = true;
      const data = {
        ride_request_id: this.ride_request_id,
        driver_id: this.driver_id,
        is_accept: accepted ? 1 : 0
      }
      const response: any = await this.apiHelperService.acceptRide(data);
      this.acceptSubimitted = false;
      accepted ? this.showAcceptSpin = false : this.showDecSpin = false;

      console.log('-----------------------------');

      console.log(response);
      console.log(this.data.start_latitude);
      console.log(this.data.start_longitude);

      if (response.status == true) {
        // this.triggerRider();
        this.modalController.dismiss({
          'dismissed': true,
          'accepted': accepted,
          'riderLocation': { lat: this.data.start_latitude, lng: this.data.start_longitude }
        });
      }
      if (response.status == false) {
        this.modalController.dismiss();
        this.alertService.presentErrorAlert('Sorry, Ride request already expired.')
      }

    }
    catch (error: any) {
      this.alertService.presentErrorAlert(error.error.message);
    }
  }

  async triggerRider() {
    this.pusherService.notificationChannel.trigger('ride-accepted', this.data);
  }

  ionViewWillLeave(): void {
    this.noResponse = false;
  }
}
