import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GeoLocationService {
  constructor() {}

  //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
  calculateDistanceBetweenCoordinates(
    lat1: any,
    lon1: any,
    lat2: any,
    lon2: any
  ) {
    var R = 6371; // km
    var distanceBetweenLat = this.toRadians(lat2 - lat1);
    var distanceBetweenLon = this.toRadians(lon2 - lon1);
    var lat1: any = this.toRadians(lat1);
    var lat2: any = this.toRadians(lat2);

    var a =
      Math.sin(distanceBetweenLat / 2) * Math.sin(distanceBetweenLat / 2) +
      Math.sin(distanceBetweenLon / 2) *
        Math.sin(distanceBetweenLon / 2) *
        Math.cos(lat1) *
        Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  }

  // Converts numeric degrees to radians
  toRadians(value: any) {
    return (value * Math.PI) / 180;
  }
}
