import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CacheHelperService } from '../cache/cache-helper.service';
import { Router } from '@angular/router';
import { UsersService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private userService: UsersService,
    private http: HttpClient,
    private cacheHelperService: CacheHelperService,
    private router: Router
  ) {}
  defaultApiName = environment.api.baseUrl;
  token: any;
  user = {
    login: { path: 'login', apiName: this.defaultApiName },
    loginNew: { path: 'home/login', apiName: this.defaultApiName },
    logout: { path: 'logout', apiName: this.defaultApiName },
    register: { path: 'driver-register', apiName: this.defaultApiName },
    driverUpdate: { path: 'driverUpdate', apiName: this.defaultApiName },
    sendOtpCode: { path: 'otp', apiName: this.defaultApiName },
    changePassword : { path: 'forgetPasswordOtp', apiName: this.defaultApiName},
    verifyOtpCode: { path: 'verifyotp', apiName: this.defaultApiName },
  }
  cardArr:any = [];
  async authenticate(username: any, password: any) {
    const params = {
      type: 'driver',
      username,
      password
    }

    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(params);
    console.log(body)
    let url = this.defaultApiName + this.user.login.path
    const response = await this.http.post(url, body, { 'headers': headers }).toPromise();
    if (response) {
      return response;
    }
    return null;
  }

  async logout(attempt: any = null) {
    this.token = this.cacheHelperService.get('token')
    const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${this.token}` }
    let url = this.defaultApiName + this.user.logout.path
    const response: any = await this.http.get(url, { 'headers': headers }).toPromise();
    if (response && response.status == true) {
      this.cacheHelperService.clear();
      return response;
    }
    return null
  }

  async register(auth_id:any, addMode:any = true) {

    const formData: any = await this.makeRegisterData(addMode);
    this.token = this.cacheHelperService.get('token')
    const headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${this.token}` }
    if(!addMode){
      // formData.append('id', auth_id);
      formData['id'] = auth_id;
      if(formData){
        delete formData['password'];
      }
      const body = formData;
      let url = this.defaultApiName + this.user.driverUpdate.path;
      const response:any = await this.http.post(url, body, {'headers' : headers}).toPromise();
      this.cacheHelperService.store('userName', response?.data.first_name +" "+ response?.data?.last_name );
      // this.cacheHelperService.store('userImg',response?.data.profileImage);
      this.userService.editUserName(response?.data.first_name +" "+ response?.data?.last_name);
      // this.userService.editUserImg(response?.data.profileImage);   
      this.cacheHelperService.delete('register')
      return response;
    }
    // formData.forEach((value,key) => {
    //   console.log(key+" "+value)
    // });

    // const headers = { 'content-type': 'multipart/form-data'}  
    // console.log('data',data)
    // const body=JSON.stringify(data);
    // console.log('formData=>', formData)
    // const body=JSON.stringify(formData);

    
    // const headers = { 'content-type': 'application/json' };

    // let url = this.defaultApiName + this.user.register.path
    // // let url = 'https://eoffofwezmj15jh.m.pipedream.net'
    // const headers = { 'content-type': 'application/json' };
    const body = formData;
    let url = this.defaultApiName + this.user.register.path;
    const response = await this.http.post(url, body, {'headers' : headers}).toPromise();
    // const response = await this.http.post(url, formData).pipe();
    // const response = await this.http.post(url, formData, {'headers' : headers}).toPromise();
    if (response) {
      return response;
    }
    return null;
  }

  async makeRegisterData(addMode:any) {
    var signUp: any = await  this.cacheHelperService.get('signup-info');
    var personal: any = await  this.cacheHelperService.get('personal-info');
    var car: any = await  this.cacheHelperService.get('car-info');
   
    if(!addMode){
      var aboutMe:any = await this.cacheHelperService.get('aboutMe')
    }
    // images
    var licenseImage1: any = await  this.cacheHelperService.get('licenseImage1');
    var licenseImage2: any = await  this.cacheHelperService.get('licenseImage2');
    var registrationImage1: any = await  this.cacheHelperService.get('registrationImage1');
    var registrationImage2: any = await  this.cacheHelperService.get('registrationImage2');
    var insuranceImage: any = await  this.cacheHelperService.get('insuranceImage');
    var nvBusinessImage: any = await  this.cacheHelperService.get('nvBusinessImage');
    if (signUp == null || personal == null || car == null) {
      return {};
    }
    const { username, email, password, 'confirmPassword': password_confirmation } = JSON.parse(signUp)
    const { 'first_name': first_name, 'last_name': last_name, 'mobile': contact_number, city,state, zip, address, 'email': personal_email } = JSON.parse(personal)
    const { 'car_category_id': car_category_id, 'make': car_made_in, 'model': car_model, 'plateNumber': car_plate_number, 'card_number': card_number } = JSON.parse(car)
    let data:any = {};
    if(!addMode){
      const {
        next_place, movie, fun_fact, live_without, obsessed_with, next_time, fear
      } = JSON.parse(aboutMe);
      data = {
        username, email, password, password_confirmation,
        next_place, movie, fun_fact, live_without, obsessed_with, next_time, fear,
        first_name, last_name, contact_number, personal_email, city,state, zip, address,
        car_category_id, car_made_in, car_model, car_plate_number
      };
    }else{
      data = {
        username, email, password, password_confirmation,
        first_name, last_name, contact_number, personal_email, city,state, zip, address,
        car_category_id, car_made_in, car_model, car_plate_number
      };
    }
    

    this.cardArr = this.cacheHelperService.get('cardsArr') || ''
    this.cardArr = this.cacheHelperService.get('cardsArr') ? JSON.parse(this.cardArr) : null;
    this.cardArr = this.cardArr.map((item:any) => {
      item.default = false;
      if(item.id == card_number){
        item.default = true;
      }
      return item;
    })
    data['cards'] = JSON.stringify(this.cardArr);
    //this.cache.get('cardsArr')
    // console.log(typeof data['cards']);

    
    


    // let formData:any = new FormData();

    // for (const [key, value] of Object.entries(data)) {
    //   // key,value
    //   formData.append(key, value);
    // }
    if (licenseImage1) {
      licenseImage1 = JSON.parse(licenseImage1);
      data['driver_licence'] = licenseImage1.imageId
      // formData.append('driver_licence', licenseImage1.imageId);
    }
    if (licenseImage2) {
      licenseImage2 = JSON.parse(licenseImage2);
      // formData.append('business_licence', licenseImage2.imageId);
      data['business_licence'] = licenseImage2.imageId
    }
    if (registrationImage1) {
      registrationImage1 = JSON.parse(registrationImage1);
      data['vehicle_registration_document'] = registrationImage1.imageId
      // formData.append('vehicle_registration_document', registrationImage1.imageId);
    }
    if (registrationImage2) {
      registrationImage2 = JSON.parse(registrationImage2);
      data['vehicle_registration_document_2'] = registrationImage2.imageId
      // formData.append('vehicle_registration_document_2', registrationImage2.imageId);
    }
    if (insuranceImage) {
      insuranceImage = JSON.parse(insuranceImage);
      data['insurance_inspection'] = insuranceImage.imageId
      // formData.append('insurance_inspection', insuranceImage.imageId);
    }
    // debugger
    if (nvBusinessImage) {
      nvBusinessImage = JSON.parse(nvBusinessImage);
      data['nv_business_image'] = nvBusinessImage.imageId
      // formData.append('nv_business_image', nvBusinessImage.imageId);
    }
    

    // formData.forEach((value:any, key:any) => {
    //   console.log('----------')
    //   console.log(key + " " + value)
    // });



    // console.log("=====> ", formData);


    // return formData;
    return data;
  }

  async sendOtpCode() {

    var data: any = this.cacheHelperService.get('phone-info');
    const headers = { 'content-type': 'application/json' };
    const body = JSON.parse(data);
    let url = this.defaultApiName + this.user.sendOtpCode.path;
    const response = await this.http.post(url, body, { 'headers': headers }).toPromise();
    if (response) {
      return response;
    }
    return null;
  }

  async verifyOtpCode(phone: string, otp: string) {
    var data: any = { 'phone_number': phone, 'otp': otp };
    const headers = { 'content-type': 'application/json' };
    // const headers = { 'content-type': 'application/x-www-form-urlencoded'};
    const body = JSON.stringify(data);
    let url = this.defaultApiName + this.user.verifyOtpCode.path;
    const response = await this.http.post(url, body, { 'headers': headers }).toPromise();
    if (response) {
      return response;
    }
    return null;
  }

  async login() {

    const headers = { 'content-type': 'application/json' }
    const body = {}//JSON.stringify(params);
    console.log(body)
    let url = this.defaultApiName + this.user.loginNew.path
    const response = await this.http.post(url, body, { 'headers': headers }).toPromise();
    if (response) {
      return response;
    }
    return null;
  }
  async currentSession() {
    this.cacheHelperService.get('timer_settings');
  }

  async changePassword(params:any){

    const headers = { 'content-type': 'application/json'}  
    const body= JSON.stringify(params);
    console.log(body)
    let url = this.defaultApiName+this.user.changePassword.path
    const response = await this.http.post(url, body,{'headers':headers}).toPromise();
    if (response) {
        return response;
    }
    return null;
  }
}
