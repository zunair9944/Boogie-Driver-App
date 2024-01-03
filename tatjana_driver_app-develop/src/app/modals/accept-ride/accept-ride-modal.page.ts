import { Component, Injector, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { ArrivedModalPage } from '../arrived/arrived-modal.page';
import { BasePage } from 'src/app/base.page';
import { calculateDistance, distancAndDuration } from 'src/app/helper/google-helper';
import { Geolocation } from '@capacitor/geolocation';
import { environment } from 'src/environments/environment';

interface Location {
  lat: number
  lng: number
}
@Component({
  selector: 'app-accept-ride-modal',
  templateUrl: './accept-ride-modal.page.html',
  styleUrls: ['./accept-ride-modal.page.scss'],
})
export class AcceptRideModalPage extends BasePage implements OnInit {

  data: any;
  @Input() drawRoute: any;

  disabledArrivedBtn: boolean = true;
  interval: any;
  currentLoc: any = { lat: 0, lng: 0 };

  constructor(injector: Injector, private mdl: ModalController, private callNumber: CallNumber) { super(injector) }

  ngOnInit() {
    console.log("===>", this.data);



    this.interval = setInterval(() => {
      this.handleIntervalEvent();
      // console.log('setInterval ');

    }, 60000);

  }

  async handleIntervalEvent() {
    await this.updateCurrentLocation();
    const distance = calculateDistance(
      this.data.start_latitude,
      this.data.start_longitude,
      this.currentLoc.lat,
      this.currentLoc.lng
    )
    console.log(
      this.data.start_latitude + ',' + this.data.start_longitude,
      this.currentLoc.lat + ',' + this.currentLoc.lng
    );

    console.log('distance', distance, 'miles');
    if (distance < 2) {// less than 1 miles
      this.disabledArrivedBtn = false
      clearInterval(this.interval)
    }
    // distancAndDuration(
    //   this.currentLoc.lat,
    //   this.currentLoc.lng,
    //   this.currentLoc,
    //   this.data.start_latitude,
    //   this.data.start_longitude,
    //   this.data.pickup_address
    // )
  }
  async showPosition(lat:any, lang:any) {
    var url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lang}&key=${environment.google.website_key}`
    const response:any = await fetch(url);
    const reader = response.body.getReader();

    while (true) {
      const {value, done} = await reader.read();
      if (done) break;
      console.log('Received', value);
    }

console.log('Response fully received');

    
    
    
    
    
    // const result:any = await fetch(url);
    // // debugger;
    // console.log('result===========', result.body)
    // var address = result.results[0].formatted_address;
    // console.log('Adress ======> ', address)
    // return address;
}   
  async updateCurrentLocation() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.currentLoc.lat = coordinates.coords.latitude;
    this.currentLoc.lng = coordinates.coords.longitude;
    // await this.showPosition(this.currentLoc.lat, this.currentLoc.lng);
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

  async handleDriverArrived() {
    // console.log('handleDriverArrived');
    // const response: any = await this.apiHelperService.driverArrived({});
    // console.log(response);
    // if(response && response.status){
    //   this.modalController.dismiss({isArrived: true});
    // }


    try {
      this.submitAttempted = true;
      this.showLoadingSpin = true;
      const payload = { id: this.data.requestId, driver_id: this.data.driver_id }
      const response: any = await this.apiHelperService.driverArrived(payload);
      this.submitAttempted = false;
      this.showLoadingSpin = false;
      console.log('response', response);
      if (response.status == true) {
        this.modalCtrl.dismiss({ isArrived: true });
        // @todo -------------
        const dropoffLocation: Location = { lat: 0, lng: 0 }
        dropoffLocation.lat = parseFloat(this.data.start_latitude) // in actual driver location
        dropoffLocation.lng = parseFloat(this.data.start_longitude) // in actual driver location
        const pickupLocation: Location = { lat: 0, lng: 0 }
        pickupLocation.lat = parseFloat(this.data.end_latitude);
        pickupLocation.lng = parseFloat(this.data.end_longitude);
        // this.updateRoute(dropoffLocation, pickupLocation, true);
        this.drawRoute(pickupLocation, dropoffLocation)
      }

    }
    catch (e: any) {
      this.alertService.presentErrorAlert(e.error.message)

    }
    finally {
      this.submitAttempted = false;
    }


  }

}
