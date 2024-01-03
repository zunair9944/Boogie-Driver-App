import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CacheHelperService } from '../cache/cache-helper.service';
import { AuthService } from './../auth/auth.service'

@Injectable({
  providedIn: 'root'
})
export class ApiHelperService {
  token: any;
  headers: any = {};
  constructor(
    private http: HttpClient,
    private cacheHelperService: CacheHelperService
  ) {

  }
  defaultApiName = environment.api.baseUrl;
  path = {
    rider: {

    },
    driver: {
      sendMessage: { path: 'sendMessage', apiName: this.defaultApiName },
      fetchMessages: { path: 'fetchMessages', apiName: this.defaultApiName },
      makeSeen: { path: 'makeSeen', apiName: this.defaultApiName },
      getContacts: { path: 'getContacts', apiName: this.defaultApiName },
      deleteMessage: { path: 'deleteMessage', apiName: this.defaultApiName },
      activateStatus: { path: 'isonline', apiName: this.defaultApiName },
      acceptRide: { path: 'riderequest-respond', apiName: this.defaultApiName },
      driverLocation: { path: 'driverLocation', apiName: this.defaultApiName },
      driverArrived: { path: 'riderequest-arrived', apiName: this.defaultApiName },
      getActiveRide: { path: 'activeRide', apiName: this.defaultApiName },
      endTrip: { path: 'complete-riderequest', apiName: this.defaultApiName },
      getVehicleTypeList: { path: 'service-list', apiName: this.defaultApiName },
      getNotifications: { path: 'notification-list', apiName: this.defaultApiName },
      subscription: { path: 'subscription', apiName: this.defaultApiName },
      purchaseToken: { path: 'purchaseToken', apiName: this.defaultApiName },
      getBalance: { path: 'getBalance', apiName: this.defaultApiName },
      getRideHistory: { path: 'riderequest-list', apiName: this.defaultApiName },
      updateImage: {path: 'profileImage', apiName: this.defaultApiName},
      getToken: {path:'token/1',apiName: this.defaultApiName},
      getSubscription: {path: "subscription/1",apiName: this.defaultApiName}
    },
    common: {
      getOTP: { path: 'getforgetPasswordOtp', apiName: this.defaultApiName },
      saveImage: { path: 'saveImage', apiName: this.defaultApiName },
      getProfile: { path: 'getUserDetail', apiName: this.defaultApiName},
      getUserCardList: { path: 'getRiderCards', apiName: this.defaultApiName },
      contactSupport: { path: 'support', apiName: this.defaultApiName },
      getFAQs: { path: 'faqs', apiName: this.defaultApiName },
    }
  }

  /**************************************  Rider APIS ********************************/



  /**************************************  Driver APIS ********************************/


  async sendMessage(data: any) {
    const params = data
    this.token = this.cacheHelperService.get('token')
    const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${this.token}` }
    const body = JSON.stringify(params);
    // console.log(body)
    let url = this.defaultApiName + this.path.driver.sendMessage.path
    const response = await this.http.post(url, body, { 'headers': headers }).toPromise();
    if (response) {
      return response;
    }
    return null;
  }

  async fetchMessages(data: any) {
    const params = data
    this.token = this.cacheHelperService.get('token')
    const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${this.token}` }
    const body = JSON.stringify(params);
    // console.log(body)
    let url = this.defaultApiName + this.path.driver.fetchMessages.path
    const response = await this.http.post(url, body, { 'headers': headers }).toPromise();
    if (response) {
      return response;
    }
    return null;
  }

  async makeSeen(data: any) {
    const params = data
    this.token = this.cacheHelperService.get('token')
    const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${this.token}` }
    const body = JSON.stringify(params);
    // console.log(body)
    let url = this.defaultApiName + this.path.driver.makeSeen.path
    const response = await this.http.post(url, body, { 'headers': headers }).toPromise();
    if (response) {
      return response;
    }
    return null;
  }

  async getInboxContacts() {
    this.token = this.cacheHelperService.get('token')
    const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${this.token}` }
    let url = this.defaultApiName + this.path.driver.getContacts.path
    const response = await this.http.get(url, { 'headers': headers }).toPromise();
    if (response) {
      return response;
    }
    return null
  }

  async deleteMessage(data: any) {
    const params = data
    this.token = this.cacheHelperService.get('token')
    const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${this.token}` }
    const body = JSON.stringify(params);
    // console.log(body)
    let url = this.defaultApiName + this.path.driver.deleteMessage.path
    const response = await this.http.post(url, body, { 'headers': headers }).toPromise();
    if (response) {
      return response;
    }
    return null;
  }

  async userIsActive() {
    this.token = this.cacheHelperService.get('token')
    const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${this.token}` }
    let url = this.defaultApiName + this.path.driver.activateStatus.path;
    const body = { 'key': "value" }
    const response = await this.http.get(url, { 'headers': headers }).toPromise();
    if (response) {
      return response;
    }
    return null;
  }
  async activateDriver() {
    this.token = this.cacheHelperService.get('token')
    const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${this.token}` }
    let url = this.defaultApiName + this.path.driver.driverLocation.path;
    const body = { 'key': "value" }
    const response = await this.http.post(url, body, { 'headers': headers }).toPromise();
    if (response) {
      return response;
    }
    return null;
  }

  async updateDriverLocation(data: any) {
    this.token = this.cacheHelperService.get('token')
    const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${this.token}` }
    let url = this.defaultApiName + this.path.driver.driverLocation.path;
    const body = data
    const response = await this.http.post(url, body, { 'headers': headers }).toPromise();
    if (response) {
      return response;
    }
    return null;
  }

  async acceptRide(data: any) {
    const params = data
    this.token = this.cacheHelperService.get('token')
    const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${this.token}` }
    const body = JSON.stringify(params);
    // console.log(body)
    let url = this.defaultApiName + this.path.driver.acceptRide.path
    const response = await this.http.post(url, body, { 'headers': headers }).toPromise();
    if (response) {
      return response;
    }
    return null;
  }

  async driverArrived(data: any) {
    const params = data
    this.token = this.cacheHelperService.get('token')
    const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${this.token}` }
    const body = JSON.stringify(params);
    // console.log(body)
    let url = this.defaultApiName + this.path.driver.driverArrived.path
    const response = await this.http.post(url, body, { 'headers': headers }).toPromise();
    if (response) {
      return response;
    }
    return null;
  }

  async getActiveRide(data: any) {
    const params = data
    this.token = this.cacheHelperService.get('token')
    const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${this.token}` }
    const body = JSON.stringify(params);
    // console.log(body)
    let url = this.defaultApiName + this.path.driver.getActiveRide.path
    const response = await this.http.post(url, body, { 'headers': headers }).toPromise();
    if (response) {
      return response;
    }
    return null;
  }

  async endTrip(data: any) {
    const params = data
    this.token = this.cacheHelperService.get('token')
    const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${this.token}` }
    const body = JSON.stringify(params);
    // console.log(body)
    let url = this.defaultApiName + this.path.driver.endTrip.path
    const response = await this.http.post(url, body, { 'headers': headers }).toPromise();
    if (response) {
      return response;
    }
    return null;
  }

  async getVehicleTypeList() {
    const params = {}
    this.token = this.cacheHelperService.get('token')
    const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${this.token}` }
    let url = this.defaultApiName + this.path.driver.getVehicleTypeList.path
    const response = await this.http.get(url, { 'headers': headers }).toPromise();
    if (response) {
      return response;
    }
    return null
  }
  async subscription(data: any) {
    const params = data
    this.token = this.cacheHelperService.get('token')
    const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${this.token}` }
    const body = JSON.stringify(params);
    console.log(body) 
    let url = this.defaultApiName + this.path.driver.subscription.path
    const response = await this.http.post(url, body, { 'headers': headers }).toPromise();
    if (response) {
      return response;
    }
    return null;
  }

  async purchaseToken(data: any) {
    const params = data
    this.token = this.cacheHelperService.get('token')
    const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${this.token}` }
    const body = JSON.stringify(params);
    // console.log(body)
    let url = this.defaultApiName + this.path.driver.purchaseToken.path
    const response = await this.http.post(url, body, { 'headers': headers }).toPromise();
    if (response) {
      return response;
    }
    return null;
  }

  async getBalance() {
    const params = {}
    this.token = this.cacheHelperService.get('token')
    const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${this.token}` }
    let url = this.defaultApiName + this.path.driver.getBalance.path
    const response = await this.http.get(url, { 'headers': headers }).toPromise();
    if (response) {
      return response;
    }
    return null
  }


  async getRideHistory() {
    const params = {}
    this.token = this.cacheHelperService.get('token')
    const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${this.token}` }
    let url = this.defaultApiName + this.path.driver.getRideHistory.path
    const response = await this.http.get(url, { 'headers': headers }).toPromise();
    if (response) {
      return response;
    }
    return null
  }

  async getTokenPrice(){
    let url = this.defaultApiName + this.path.driver.getToken.path;
    const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${this.token}` }
    return this.http.get(url, { 'headers': headers });
  }

  async getSubscriptionPrice(){
    let url = this.defaultApiName + this.path.driver.getSubscription.path;
    const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${this.token}` }
    return this.http.get(url, { 'headers': headers });
  }

  async updateImage(data:any = {}) {

    const params = data;
    this.token = this.cacheHelperService.get('token')
    const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${this.token}` }
    const body = JSON.stringify(params);
    let url = this.defaultApiName + this.path.driver.updateImage.path
    const response = await this.http.post(url, body, { 'headers': headers }).toPromise();
    if (response) {
      return response;
    }
    return null;
  }

  /**************************************  Common APIS ********************************/
  async getOTP(data: any) {
    const params = data
    this.token = this.cacheHelperService.get('token')
    const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${this.token}` }
    const body = JSON.stringify(params);
    // console.log(body)
    let url = this.defaultApiName + this.path.common.getOTP.path
    const response = await this.http.post(url, body, { 'headers': headers }).toPromise();
    if (response) {
      return response;
    }
    return null;
  }


  async saveImage(data: any) {
    const params = data
    this.token = this.cacheHelperService.get('token')
    const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${this.token}` }
    const body = JSON.stringify(params);
    // console.log(body)
    let url = this.defaultApiName + this.path.common.saveImage.path
    const response = await this.http.post(url, body, { 'headers': headers }).toPromise();
    if (response) {
      return response;
    }
    return null;
  }

  async getProfile(){
    this.token = this.cacheHelperService.get('token')
    const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${this.token}` }
    let url = this.defaultApiName + this.path.common.getProfile.path
    const response = await this.http.get(url, { 'headers': headers }).toPromise();
    if (response) {
      return response;
    }
    return null
  }

  async getNotifications(data:any = {}) {

    const params = data;
    this.token = this.cacheHelperService.get('token')
    const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${this.token}` }
    const body = JSON.stringify(params);
    // console.log(body)
    let url = this.defaultApiName + this.path.driver.getNotifications.path
    const response = await this.http.post(url, body, { 'headers': headers }).toPromise();
    if (response) {
      return response;
    }
    return null;
  }

  async getUserCardList() {
    const params = {}
    this.token = this.cacheHelperService.get('token')
    const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${this.token}` }
    let url = this.defaultApiName + this.path.common.getUserCardList.path
    const response = await this.http.get(url, { 'headers': headers }).toPromise();
    if (response) {
      return response;
    }
    return null
  }

  async contactSupport(data: any) {
    const params = data
    this.token = this.cacheHelperService.get('token')
    const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${this.token}` }
    const body = JSON.stringify(params);
    // console.log(body)
    let url = this.defaultApiName + this.path.common.contactSupport.path
    const response = await this.http.post(url, body, { 'headers': headers }).toPromise();
    if (response) {
      return response;
    }
    return null;
  }

  async getFAQs() {
    const params = {}
    this.token = this.cacheHelperService.get('token')
    const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${this.token}` }
    let url = this.defaultApiName + this.path.common.getFAQs.path
    const response = await this.http.get(url, { 'headers': headers }).toPromise();
    if (response) {
      return response;
    }
    return null
  }
}
