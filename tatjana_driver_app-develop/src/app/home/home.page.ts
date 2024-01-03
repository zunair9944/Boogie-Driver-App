import { Component } from '@angular/core';

import { PhotoService } from '../services/photo.service';
import { HomePageService } from './home.page.service';
import { environment } from 'src/environments/environment';

import { GoogleMap } from '@capacitor/google-maps';
import { dd } from 'sampleData';

// var g = google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public photoService: PhotoService, private homeService: HomePageService) { }

  directionsService = new google.maps.DirectionsService;
  directionsRenderer = new google.maps.DirectionsRenderer;
  gmap: any = null;

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  handleHomeAPI() {
    this.homeService.handleHomeAPI();
  }

  async loadMap() {

    const apikey: string = environment.google.website_key;
    console.log(dd.locations.park);
    console.log(dd.locations.akbar_chowk);




    // const mapRef: any = document.getElementById('map');

    // const newMap = await GoogleMap.create({
    //   id: 'my-map', // Unique identifier for this map instance
    //   element: mapRef, // reference to the capacitor-google-map element
    //   apiKey: apikey, // Your Google Maps API Key
    //   config: {
    //     center: dd.locations.park,
    //     zoom: 8, // The initial zoom level to be rendered by the map
    //   },
    // });

    // Add a marker to the map
    // const markerId = await newMap.addMarker({
    //   coordinate: {
    //     lat: 33.6,
    //     lng: -117.9
    //   }
    // });

    // console.log(newMap);



    this.gmap = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        zoom: 12,
        center: new google.maps.LatLng(dd.locations.park),
      }
    );
    console.log('=>', this.gmap);

    this.directionsRenderer.setMap(this.gmap);
    const origin = new google.maps.LatLng(dd.locations.park);
    const destination = new google.maps.LatLng(dd.locations.akbar_chowk);
    this.directionsService
      .route({
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        // console.log(response);
        this.directionsRenderer.setDirections(response);
      })
      .catch((e) => window.alert("Directions request failed due to " + status));

  }
  changeRoute() {
    const origin = new google.maps.LatLng(dd.locations.allahoo_chowk);
    const destination = new google.maps.LatLng(dd.locations.akbar_chowk);
    this.directionsService
      .route({
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        // console.log(response);
        this.directionsRenderer.setDirections(response);
      })
      .catch((e) => window.alert("Directions request failed due to " + status));

  }
}



