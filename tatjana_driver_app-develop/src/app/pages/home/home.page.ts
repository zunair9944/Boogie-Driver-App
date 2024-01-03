import { ChangeDetectorRef, Component, Injector, OnInit } from '@angular/core';

import { GoogleMap } from '@capacitor/google-maps';
// import { ModalController } from '@ionic/angular';
import { BasePage } from 'src/app/base.page';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@capacitor/geolocation';
import { dd } from 'sampleData';
import { ConfirmRideModalPage } from 'src/app/modals/confirm-ride-modal/confirm-ride-modal.page';
import { PusherService } from 'src/app/services/pusher/pusher.service';
import { drawMarker } from 'src/app/helper/google-helper';
import * as _ from 'lodash';
import { AcceptRideModalPage } from 'src/app/modals/accept-ride/accept-ride-modal.page';
import { ArrivedModalPage } from 'src/app/modals/arrived/arrived-modal.page';
import { EndTripModalPage } from 'src/app/modals/end-trip/end-trip-modal.page';


interface Location {
  lat: number
  lng: number
}
// const driverIcon =
//   "https://developers.google.com/static/maps/documentation/javascript/images/default-marker.png";
const driverIcon =
{
  url: "https://icons.iconarchive.com/icons/iconsmind/outline/48/Car-2-icon.png",
  size: new google.maps.Size(48, 48),
  origin: new google.maps.Point(0, 0),
  anchor: new google.maps.Point(0, 48),
};

// const image = {
//   url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
//   // This marker is 20 pixels wide by 32 pixels high.
//   size: new google.maps.Size(20, 32),
//   // The origin for this image is (0, 0).
//   origin: new google.maps.Point(0, 0),
//   // The anchor for this image is the base of the flagpole at (0, 32).
//   anchor: new google.maps.Point(0, 32),
// };

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage extends BasePage {
  auth_id: any;
  is_driver_online: any;
  constructor(private pusherService: PusherService, private ref: ChangeDetectorRef, injector: Injector) {
    super(injector)
  }

  directionsService = new google.maps.DirectionsService;
  // directionsRenderer = new google.maps.DirectionsRenderer;
  // directionsRenderer = new google.maps.DirectionsRenderer({ preserveViewport: true });
  directionsRenderer = new google.maps.DirectionsRenderer({
    suppressMarkers: false, preserveViewport: false,
    polylineOptions: {
      strokeColor: "#A352A3"
    }
  });
  gmap: any = null;

  // map: any = null;
  driverMarker: any = null;
  riderCircle: any = null;
  circleTimer: any = null;
  myLoc: Location = { lat: 0, lng: 0 }
  lastknownLoc: Location = { lat: -1, lng: -1 }
  isDriverActive = false
  interval: any;
  driverDeclineRequest = false;
  searchingForRide = false;
  rideExpired: boolean = false;
  pickupLocation: Location = { lat: 0, lng: 0 }
  dropoffLocation: Location = { lat: 0, lng: 0 }
  bellIcon:any = '/assets/icon/bell-nodot.svg';
  /////////////
  // test data
  /////////////
  testLoc = [
    dd.locations.l1,
    dd.locations.l2,
    dd.locations.l3,
    dd.locations.l4,
    dd.locations.d1,
  ]
  testI = 0;
  testDestination = dd.locations.d1;
  testMyLoc = { lat: 0, lng: 0 };
  /////////////

  async ngOnInit() {

    this.listenRideRequest();
    this.listenCancelledRide();
    // test-ony
  }

  async ionViewWillEnter() {
    this.searchingForRide = true;
    let userIfo = this.cache.get('user_info') || ''
    if (userIfo) {
      let data = JSON.parse(userIfo);
      this.auth_id = data.id;
      this.isDriverActive = true;
      this.searchingForRide = true;

      let is_driver_online: any = this.cache.get('is_driver_online');
      this.isDriverActive = JSON.parse(is_driver_online) || false

      let searching_for_ride: any = this.cache.get('searching_for_ride');
      this.searchingForRide = JSON.parse(searching_for_ride) || false
    }
    this.driverDeclineRequest = false;

    this.loadMap();
    // this.checkUserIsActive();
    this.findActiveRide();
  }

  async findActiveRide() {
    try {
      this.loadingService.present();
      const payload = { user_id: this.auth_id, type: 'driver' }
      const response: any = await this.apiHelperService.getActiveRide(payload);
      console.log('response', response);
      if (response.status == true) {
        // allah ho chowk
        // this.myLoc.lat = 31.469358;
        // this.myLoc.lng = 74.299110;
        // if ride status is driver awaiting.
        const rideData = response.data || null
        if (rideData && rideData.ride_status === 'arrived') {
          // show active ride modal or on the way modal.
          // const destination: Location = { lat: 0, lng: 0 }
          // destination.lat = parseFloat(rideData.start_latitude)
          // destination.lng = parseFloat(rideData.start_longitude)

          // const origin: Location = { lat: this.myLoc.lat, lng: this.myLoc.lng }
          // this.drawRoute(origin, destination);
          this.openEndTripModal(rideData);
        }

        if (rideData && rideData.ride_status === 'accepted') {
          // const destination: Location = { lat: 0, lng: 0 }
          // destination.lat = parseFloat(rideData.start_latitude)
          // destination.lng = parseFloat(rideData.start_longitude)

          // const origin: Location = { lat: this.myLoc.lat, lng: this.myLoc.lng }
          // this.drawRoute(destination, origin);
          this.openDriverArrivedModal(rideData)
        }

      }
      if (response.status == false) {

      }

    }
    catch (error: any) {
      this.alertService.presentErrorAlert(error.error.message);
    }
    finally {
      this.loadingService.dismiss(true);
    }
  }

  listenRideRequest() {
    this.pusherService.notificationChannel.bind('ride-request', (payload: any) => {
      if (payload.data.driver_id == this.auth_id && this.is_driver_online) {
        this.modalCtrl.dismiss();
        this.notify();
        this.presentRideModal(payload.data);
      }
    });
  }

  listenCancelledRide() {
    this.pusherService.notificationChannel.bind('cancel-ride-request', (payload: any) => {
      if (payload.data.driver_id == this.auth_id && this.is_driver_online) {
        this.modalCtrl.dismiss();
        this.rideExpired = true;
        this.searchingForRide = false;
        this.notify();
        setTimeout(() => {
          // this.removeOldMarkerIfExist();
          this.removRoute();
          this.rideExpired = false;
          this.searchingForRide = true;
        }, 3000)
      }
    });
  }



  async loadMap() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.myLoc.lat = coordinates.coords.latitude;
    this.myLoc.lng = coordinates.coords.longitude;

    this.gmap = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        zoom: 15,
        center: new google.maps.LatLng(this.myLoc),
        disableDefaultUI: true,
        mapId: "69ec83d2b0233613"
      }
    );

    this.makeDriverMapMarker();

    this.drawLocationPing(this.myLoc);
  }

  drawLocationPing(location: Location) {
    const radius = 150;
    const circleOption = {
      strokeColor: "#A352A3",
      strokeOpacity: 0.8,
      strokeWeight: 1.5,
      fillColor: "#A352A3",
      fillOpacity: 0.35,
      map: this.gmap,
      center: new google.maps.LatLng(location),
      radius: radius,
    };
    this.riderCircle = new google.maps.Circle(circleOption);

    var rMin = 10;
    var rMax = radius;
    var direction = 1;
    var that = this;
    this.circleTimer = setInterval(function () {
      var radius = that.riderCircle.getRadius();

      if ((radius > rMax) || (radius < rMin)) {
        direction *= -1;
      }
      circleOption.radius = radius + direction * 10;
      circleOption.fillOpacity = 0.2;

      that.riderCircle.setOptions(circleOption);
    }, 70);
  }

  async checkUserIsActive() {
    try {
      const response: any = await this.apiHelperService.userIsActive();
      if (response.status == true) {
        this.activateDriver();
      }
      else {
        this.isDriverActive = false;
        console.log(response);
      }
    } catch (error: any) {
      console.log(error);
      // this.alertService.presentErrorAlert(error.error.message);
    }
  }

  async updateDriverLocation() {
    try {
      const data = { latitude: this.myLoc.lat, longitude: this.myLoc.lng }
      const response: any = await this.apiHelperService.updateDriverLocation(data);
    } catch (error: any) {
      console.log(error);
    }
  }

  async handleClickLetsBoogie() {

    try {
      const response: any = await this.apiHelperService.activateDriver()
      if (response.status == true) {

      }
      else {
        console.log(response);
        this.alertService.presentErrorAlert('Something went wrong')
      }
    } catch (error: any) {
      console.log(error);

      this.alertService.presentErrorAlert(error.error.message);
    }

    // this.makeDriverMapMarker()


    // this.gmap.panTo(dd.locations.park)
    //////////////////////



    this.activateDriver();
  }

  activateDriver() {
    this.isDriverActive = true;
    this.searchingForRide = true;
    this.cache.store('is_driver_online', true);
    this.cache.store('searching_for_ride', true);
    this.interval = setInterval(() => {
      this.handleIntervalEvent();
    }, 5000);
  }

  handleIntervalEvent() {
    this.updateCurrentLocation();
    // test-only

    // this.testMyLoc = this.testLoc[this.testI];
    // console.log(this.testLoc[this.testI]);
    // this.drawRoute(this.testMyLoc, this.testDestination);


    // this.myLoc.lat = this.testMyLoc.lat;
    // this.myLoc.lng = this.testMyLoc.lng;
    // this.makeDriverMapMarker();

    // console.log(this.testI);
    // if (this.testI == 4) {
    //   this.testI = 0;
    // } else {
    //   this.testI++;
    // }

  }

  handleUpdateRouteTimeInterval() {
    this.drawRoute(this.myLoc, this.pickupLocation);
  }

  deactivateDriver() {
    this.isDriverActive = false;
    clearInterval(this.interval);
  }

  async updateLocationMoveMapToMarker() {
    this.updateCurrentLocation();
    await this.makeDriverMapMarker();
  }

  async makeDriverMapMarker() {
    this.removeOldMarkerIfExist();
    console.log('my location', `${this.myLoc.lat},${this.myLoc.lng}`)
    this.driverMarker = new google.maps.Marker({
      position: this.myLoc,
      map: this.gmap,
      // icon: driverIcon
    });
    this.moveMapToCurrentLocation();
  }

  removeOldMarkerIfExist() {
    if (this.driverMarker)
      this.driverMarker.setMap(null);
  }
  removeAnimatedCircleIfExist() {
    if (this.riderCircle) {
      this.riderCircle.setMap(null);
      clearInterval(this.circleTimer);
    }
  }

  async updateCurrentLocation() {

    const coordinates = await Geolocation.getCurrentPosition();
    this.myLoc.lat = coordinates.coords.latitude;
    this.myLoc.lng = coordinates.coords.longitude;
    if (!_.isEqual(this.myLoc, this.lastknownLoc)) {
      this.updateDriverLocation();
    }
    this.lastknownLoc.lat = this.myLoc.lat
    this.lastknownLoc.lng = this.myLoc.lng

    return this.myLoc;
  }

  async moveMapToCurrentLocation() {
    this.gmap.panTo(this.myLoc)
  }

  drawRoute(start: any, end: any, fitBounds: boolean = false) {
    this.directionsRenderer.setMap(this.gmap);
    const origin = new google.maps.LatLng(start);
    const destination = new google.maps.LatLng(end);
    this.directionsService
      .route({
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        // console.log('response ==>', response)
        // this.gmap.panTo(end)
        // drawMarker(end, this.gmap, 'rider');
        this.directionsRenderer.setDirections(response);
        if (fitBounds) {
          this.gmap.fitBounds(start, end);
        }
      })
      .catch((e) => console.log(e));
  }

  async presentRideModal(data: any) {

    this.searchingForRide = false;
    const modal = await this.modalCtrl.create({
      component: ConfirmRideModalPage,
      id: 'confirmRidemodal',
      showBackdrop: false,
      initialBreakpoint: 0.7,
      backdropBreakpoint: 0.7,
      breakpoints: [0.7, 0.2],
      handleBehavior: 'cycle',
      backdropDismiss: false,
      cssClass: 'modalMain',
      componentProps: { data: data }
    });
    modal.onDidDismiss().then((response: any) => {
      if (response && response.data && response.data.accepted) {

        // this.pickupLocation = { lat: Number(response.data.riderLocation.lat), lng: Number(response.data.riderLocation.lng) }
        // this.myLoc.lat = 31.469358;
        // this.myLoc.lng = 74.299110;
        // this.drawRoute(this.myLoc, this.pickupLocation);
        this.interval = setInterval(() => {
          // this.handleUpdateRouteTimeInterval();
        }, 2000);
        this.openDriverArrivedModal(data)
      }
      else { // driver decline request
        this.driverDeclineRequest = true;
        this.searchingForRide = true;
      }

    });
    return await modal.present();
  }

  async openDriverArrivedModal(data: any) {
    // const driverLocation: Location = { lat: 0, lng: 0 }
    // driverLocation.lat = parseFloat(data.driverData.latitude)
    // driverLocation.lng = parseFloat(data.driverData.logitude)
    const pickupLocation: Location = { lat: 0, lng: 0 }
    pickupLocation.lat = parseFloat(data.start_latitude);
    pickupLocation.lng = parseFloat(data.start_longitude);

    this.removeOldMarkerIfExist()
    this.removeAnimatedCircleIfExist()



    this.drawRoute(this.myLoc, pickupLocation);

    // @todo implement driver accept API 
    const modal = await this.modalCtrl.create({
      component: AcceptRideModalPage,
      id: 'acceptRidemodal',
      componentProps: { data: data, drawRoute: this.drawRoute.bind(this) },
      showBackdrop: false,
      initialBreakpoint: 0.7,
      backdropBreakpoint: 0.7,
      breakpoints: [0.7, 0.2],
      handleBehavior: 'cycle',
      backdropDismiss: false,
      cssClass: 'modalMain'
    });
    modal.onDidDismiss().then((response: any) => {
      if (response && response.data && response.data.isArrived) {
        this.openEndTripModal(data);
      }
      // this.openArrivedModal(data);
    });
    return await modal.present();
  }

  async openArrivedModal(data: any) {
    const modal = await this.modalCtrl.create({
      component: ArrivedModalPage,
      id: 'arrivedModal',
      componentProps: { data: data },
      showBackdrop: false,
      initialBreakpoint: 0.2,
      backdropBreakpoint: 0.2,
      breakpoints: [0.2, 0.7],
      backdropDismiss: false,
      cssClass: 'modalMain'
    });
    modal.onDidDismiss().then((response: any) => {
      this.openEndTripModal(data)
    });
    return await modal.present();
  }

  async openEndTripModal(data: any) {
    const dropoffLocation: Location = { lat: 0, lng: 0 }
    dropoffLocation.lat = parseFloat(data.start_latitude) // in actual driver location
    dropoffLocation.lng = parseFloat(data.start_longitude) // in actual driver location
    const pickupLocation: Location = { lat: 0, lng: 0 }
    pickupLocation.lat = parseFloat(data.end_latitude);
    pickupLocation.lng = parseFloat(data.end_longitude);

    this.removeOldMarkerIfExist()
    this.removeAnimatedCircleIfExist()

    this.drawRoute(dropoffLocation, pickupLocation)

    const modal = await this.modalCtrl.create({
      component: EndTripModalPage,
      id: 'endtripModal',
      componentProps: { data: data, removRoute: this.removRoute.bind(this), drawRoute: this.drawRoute.bind(this), notify: this.notify.bind(this) },
      showBackdrop: false,
      initialBreakpoint: 0.25,
      backdropBreakpoint: 0.82,
      breakpoints: [0.25, 0.2],
      handleBehavior: 'cycle',
      backdropDismiss: false,
      cssClass: 'modalMain'
    });
    modal.onDidDismiss().then((response: any) => {
      console.log('ending trip..')
    });
    return await modal.present();
  }

  removRoute() {
    // this.driverMarker(dd.locations.driver2, this.gmap, 'driver')
    this.makeDriverMapMarker();
    this.drawLocationPing(this.myLoc);
    this.gmap.panTo(this.myLoc)
    // drawMarker(this.myLoc, this.gmap, 'driver');
    this.directionsRenderer.setMap(null);
  }
  async notify(){
    this.bellIcon = '/assets/icon/bell-icon.svg';
    try {
      const response: any = await this.apiHelperService.getNotifications();
      console.log('response', response);
      if (response.status == true) {
        let notificationList = response?.data?.list;
        let unreadCount = response?.data?.unreadCount;
        let notifications = {
          list : notificationList,
          unreadCount : unreadCount
        }
        this.cache.store('notifications', JSON.stringify(notifications))
      }
      if (response.status == false) {
        this.alertService.presentErrorAlert('Sorry, failed to get unread notifications')
      }

    }
    catch (error: any) {
      this.alertService.presentErrorAlert(error.error.message);
    }
    finally {
      this.loadingService.dismiss(true);
    }
  }
}
