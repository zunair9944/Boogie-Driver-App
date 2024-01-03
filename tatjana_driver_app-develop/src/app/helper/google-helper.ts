const axios = require('axios');
import { environment } from "src/environments/environment";
interface Location {
  lat: number
  lng: number
}
const driverIcon =
{
  //   url: "https://icons.iconarchive.com/icons/iconsmind/outline/48/Car-2-icon.png",
  url: "https://developers.google.com/static/maps/documentation/javascript/images/default-marker.png",
  //   size: new google.maps.Size(48, 48),
  //   origin: new google.maps.Point(0, 0),
  //   anchor: new google.maps.Point(0, 48),
};
const riderIcon =
{
  url: "https://developers.google.com/static/maps/documentation/javascript/images/default-marker.png",
  //   size: new google.maps.Size(48, 48),
  //   origin: new google.maps.Point(0, 0),
  //   anchor: new google.maps.Point(0, 48),
};
export function drawMarker(location: Location, gmap: any, type: string) {
  return new google.maps.Marker({
    position: location,
    map: gmap,
    icon: type == 'driver' ? driverIcon : riderIcon
  });
}

/*
* 
* lat1, lon1 = Latitude and Longitude of point 1 (in decimal degrees)
* lat2, lon2 = Latitude and Longitude of point 2 (in decimal degrees)
* unit = the unit you desire for results
*  'M' is statute miles (default)
*  'K' is kilometers
*  'N' is nautical miles
*/

export async function distancAndDuration(start_lat:any, start_lng:any, start_address:any, end_address:any, end_lat:any, end_lng:any){
  // var service = new google.maps.DistanceMatrixService();
  // await service.getDistanceMatrix(
  //   {
  //     origins: [start_lat, start_lng],
  //     destinations: [end_lat, end_lng],
  //     travelMode: google.maps.TravelMode.DRIVING,
  //     unitSystem: google.maps.UnitSystem.METRIC,
  //     avoidHighways: false,
  //     avoidTolls: false
  //   }, callback);
  
  // function callback(response:any, status:any) {
  //   console.log('response of distance matrix========>', response)
  //   // See Parsing the Results for
  //   // the basics of a callback function.
  // }


  var origin1 = new google.maps.LatLng(start_lat, start_lng);
  var origin2 = start_address;
  var destinationA = end_address;
  var destinationB = new google.maps.LatLng(end_lat, end_lng);

  var service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
  {
    origins: [origin1, origin2],
    destinations: [destinationA, destinationB],
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.METRIC,
    avoidHighways: false,
    avoidTolls: false
  }, callback);

  function callback(response:any, status:any) {
    console.log('response of distance matrix========>', response)
    // See Parsing the Results for
    // the basics of a callback function.

    const distanceText = response.data.rows[0].elements[0].distance.text;
    const durationText = response.data.rows[0].elements[0].duration.text;

    // Example pricing formula based on distance and time traveled
    const distance = parseFloat(distanceText.replace(/,/g, ''));
    const duration = parseFloat(durationText.replace(/ mins/g, ''));
    console.log(`Distance: ${distanceText}`);
    console.log(`Duration: ${durationText}`);
    return {distance, duration};
  }












  // Example origin and destination addresses
  // const origin = '123 Main St, Anytown USA';
  // const destination = '456 Elm St, Anytown USA';

  // Make a request to the Google Maps Distance Matrix API
  
  // const headers = { "Access-Control-Allow-Origin": "*" }
  // const url = `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${end_lat}%2C${end_lng}%7C&origins=${start_lat}%2C${start_lng}&key=${environment.google.website_key}`;
  // await axios.get(url, { 'headers': headers })
  //   .then((response:any) => {
  //     debugger
  //     const distanceText = response.data.rows[0].elements[0].distance.text;
  //     const durationText = response.data.rows[0].elements[0].duration.text;

  //     // Example pricing formula based on distance and time traveled
  //     const distance = parseFloat(distanceText.replace(/,/g, ''));
  //     const duration = parseFloat(durationText.replace(/ mins/g, ''));
  //     // const pricePerMile = 0.5;
  //     // const pricePerMinute = 0.1;
  //     // const price = distance * pricePerMile + duration * pricePerMinute;

  //     console.log(`Distance: ${distanceText}`);
  //     console.log(`Duration: ${durationText}`);
  //     // console.log(`Price: $${price.toFixed(2)}`);
  // })
  // .catch((error:any) => {
  //   console.error(error);
  // });
}
export function calculateDistance(lat1: any, lon1: any, lat2: any, lon2: any, unit: any = "") {
  if ((lat1 == lat2) && (lon1 == lon2)) {
    return 0;
  }
  else {
    var radlat1 = Math.PI * lat1 / 180;
    var radlat2 = Math.PI * lat2 / 180;
    var theta = lon1 - lon2;
    var radtheta = Math.PI * theta / 180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == "K") { dist = dist * 1.609344 }
    if (unit == "N") { dist = dist * 0.8684 }
    return dist;
  }
}
