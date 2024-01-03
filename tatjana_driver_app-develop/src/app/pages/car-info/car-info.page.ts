import { ChangeDetectorRef, Component, Injector, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BasePage } from 'src/app/base.page';
import { Fields } from 'src/app/common/fields.interface';
import { Photo } from 'src/app/common/photo.interface';
import { PhotoService } from 'src/app/services/photo.service';
import { SuccessPage } from './../../modals/success/success.page';
import { NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.page.html',
  styleUrls: ['./car-info.page.scss'],
})

export class CarInfoPage extends BasePage {

  splashBgTop = 'assets/icon/orange_bg.svg';
  loginbgCenter = 'assets/icon/blue_bg_login.svg';
  hello = 'assets/icon/hello.svg';
  shakeEffect: boolean = false;
  showCnt: any
  loginError: string = '';
  showLoadingSpin: boolean = false;
  auth_id:any;
  addMode: boolean = true;
  categoryList:any = [];
  cardArr:any = [];
  constructor(private ref: ChangeDetectorRef, injector: Injector, public photoService: PhotoService) {
    super(injector)
    // let userIfo = this.cache.get('user_info') || ''
    
    // if (userIfo.length) {
    //   let data = JSON.parse(userIfo);
    //   this.auth_id = data.id;
    //   if(this.auth_id){
    //     this.addMode = false;
    //   }
    // }
  }
  ngAfterContentChecked() {

    this.ref.detectChanges();

  }

  async ngOnInit() {
    this.initForm();
    // this.resetImageCache();
    this.addMode = true;
    let userIfo = this.cache.get('user_info') || ''
    if (userIfo) {
      let data = JSON.parse(userIfo);
      this.auth_id = data.id;
      if(this.auth_id){
        this.addMode = false;
      }
    }
    if(this.addMode){
      await this.resetImageCache();
    }
  }

  async ionViewWillEnter() {
    this.addMode = true;
    let userIfo = this.cache.get('user_info') || ''
    if (userIfo) {
      let data = JSON.parse(userIfo);
      this.auth_id = data.id;
      if(this.auth_id){
        this.addMode = false;
      }
    }
    // if(this.addMode){
    //   await this.resetImageCache();
    // }
    this.showLoadingSpin = false;
    this.submitAttempted = false;
    this.nextClicked = false;

    let uploadedPhoto: any;
    if (history.state.data) {
      uploadedPhoto = history.state.data
    }
    if (uploadedPhoto) {

      // console.log('cahce=> ', JSON.parse(uploadedPhoto));

      const uploadImage = uploadedPhoto;

      switch (uploadImage.placeholderName) {

        case 'registrationImage1':
          this.cache.store('registrationImage1', JSON.stringify(uploadImage.image));
          this.registrationImage1 = uploadImage.image;
          this.isSelectedRegistrationImage1 = true;
          break;
        case 'registrationImage2':
          this.cache.store('registrationImage2', JSON.stringify(uploadImage.image));
          this.registrationImage2 = uploadImage.image;
          this.isSelectedRegistrationImage2 = true;
          break;
        case 'insuranceImage':
          this.cache.store('insuranceImage', JSON.stringify(uploadImage.image));
          this.insuranceImage = uploadImage.image;
          this.isSelectedInsuranceImage = true;
          break;
        case 'nvBusinessImage':
          this.cache.store('nvBusinessImage', JSON.stringify(uploadImage.image));
          this.nvBusinessImage = uploadImage.image;
          this.isSelectedNvBusinessImages = true;
            break;
          

        default:
          break;
      }
      // if(this.isInsuranceImageUploaded && this.isRegistrationImage1Uploaded && this.isRegistrationImage2Uploaded){
      //   this.submitAttempted = false;
      // }
    }
    await this.getVehicleList();
    await this.getCashedValues()
  }

  getCashedValues = async () => {
    // this.loadingService.present();
    let registrationImage1:any = this.cache.get('registrationImage1');
    // this.loadingService.dismiss();
    if(registrationImage1){
      const uploadImage =  JSON.parse(registrationImage1);
      this.registrationImage1 = uploadImage;
      this.isSelectedRegistrationImage1 = true;
    }

    let registrationImage2:any = this.cache.get('registrationImage2')
    if(registrationImage2){
      const uploadImage = JSON.parse(registrationImage2);
      this.registrationImage2 = uploadImage;
      this.isSelectedRegistrationImage2 = true;
    }

    let insuranceImage:any = this.cache.get('insuranceImage')
    if(insuranceImage){
      const uploadImage = JSON.parse(insuranceImage);
      this.insuranceImage = uploadImage;
      this.isSelectedInsuranceImage = true;
    }
    
    let nvBusinessImage:any = this.cache.get('nvBusinessImage')
    if(nvBusinessImage){
      const uploadImage = JSON.parse(nvBusinessImage);
      this.nvBusinessImage = uploadImage;
      this.isSelectedNvBusinessImages = true;
    }

    let carInfoValues: any = this.cache.get('car-info')
    if (carInfoValues) {
      carInfoValues = carInfoValues ? JSON.parse(carInfoValues) : null;
      if (carInfoValues && Object.keys(carInfoValues).length) {
        Object.keys(carInfoValues).forEach(name => {
          if (this.ngForm.controls[name]) {
            this.ngForm.controls[name].patchValue(carInfoValues[name]);
          }
        });
        this.cardArr = this.cache.get('cardsArr') || ''
        this.cardArr = this.cache.get('cardsArr') ? JSON.parse(this.cardArr) : null;
      }
    }
  }
  goToAddCard(){
    this.router.navigateByUrl('card-information')
  }
  async resetImageCache() {
    this.registrationImage1 = { webviewPath: '/assets/icon/img-placeholder.svg', base64: '', imageId: '' };
    this.registrationImage2 = { webviewPath: '/assets/icon/img-placeholder.svg', base64: '', imageId: '' };
    this.insuranceImage = { webviewPath: '/assets/icon/img-placeholder.svg', base64: '', imageId: '' };
    this.nvBusinessImage = { webviewPath: '/assets/icon/img-placeholder.svg', base64: '', imageId: '' };
    this.cache.delete('uploaded-image');
    this.cache.delete('registrationImage1');
    this.cache.delete('registrationImage2');
    this.cache.delete('insuranceImage');
    this.cache.delete('nvBusinessImages');
  }

  fields: Array<string> = ['car_category_id', 'make', 'model', 'plateNumber','card_number'];

  initForm() {
    const obj: Fields = {};
    this.fields.forEach(field => {
      obj[field] = new FormControl('', Validators.required);
    });

    this.ngForm = this.formBuilder.group(obj);
  }

  get f() {
    return this.ngForm.controls;
  }

  nextClicked = false;
  async handleNextClick() {

    this.nextClicked = true;

    this.fields.forEach(field => {
      this.ngForm.controls[field].markAsTouched();
    });

    this.shakeEffect = false;

    const allImgValid = this.handleImageValidation();
    if (this.ngForm.valid && allImgValid == true) {
      this.showLoadingSpin = true;
      this.submitAttempted = true;
      try {

        const input: Fields = {};
        this.fields.forEach(field => {
          input[field] = this.ngForm.value[field];
        });

        this.loginError = '';
        this.cache.store('car-info', JSON.stringify(input));
        const response: any = await this.authService.register(this.auth_id, this.addMode);
        console.log('response', response);
        if (response.status == true) {
          this.cache.delete('register');
          this.cache.store('token', response.data.api_token);
          this.cache.store('user_info', JSON.stringify(response.data));
          let dateTime = new Date();
          this.cache.store('login_time', new Date())
          this.router.navigateByUrl('/home');
        }
        else {
          this.alertService.presentErrorAlert('Something went wrong')
        }
      } catch (error: any) {
        this.alertService.presentErrorAlert(error.error.message);
      } finally {
        this.showLoadingSpin = false;
        this.submitAttempted = false;
      }

    }
    // else{
    //   this.showLoadingSpin = false;
    //   this.submitAttempted = false;
    // }

  }

  isValidRegistrationImage1() {
    if (!this.nextClicked) {
      return true;
    }
    return this.validateRegistrationImage1();
  };
  validateRegistrationImage1() {
    if (this.isSelectedRegistrationImage1) {
      return true;
    }
    else {
      return false;
    }
  }
  isValidRegistrationImage2() {
    if (!this.nextClicked) {
      return true;
    }
    return this.validateRegistrationImage2();
  };
  validateRegistrationImage2() {
    if (this.isSelectedRegistrationImage2) {
      return true;
    }
    else {
      return false;
    }
  }
  isValidInsuranceImage() {
    if (!this.nextClicked) {
      return true;
    }
    return this.validateInsuranceImage();
  };
  isValidNvBusinessImage() {
    if (!this.nextClicked) {
      return true;
    }
    return this.validateNvBusinessImage();
  };
  
  validateNvBusinessImage() {
    if (this.isSelectedNvBusinessImages) {
      return true;
    }
    else {
      return false;
    }
  }
  validateInsuranceImage() {
    if (this.isSelectedInsuranceImage) {
      return true;
    }
    else {
      return false;
    }
  }



  handleImageValidation() {
    const v1 = this.isValidRegistrationImage1();
    const v2 = this.isValidRegistrationImage2();
    const v3 = this.isValidInsuranceImage();
    const v4 = this.isValidNvBusinessImage();

    if (v1 && v2 && v3) {
      return true;
    }
    return false;
  }

  registrationImage1: Photo = { webviewPath: '/assets/icon/img-placeholder.svg', base64: '', imageId: '' };
  registrationImage2: Photo = { webviewPath: '/assets/icon/img-placeholder.svg', base64: '', imageId: '' };
  insuranceImage: Photo = { webviewPath: '/assets/icon/img-placeholder.svg', base64: '', imageId: '' };
  nvBusinessImage: Photo = { webviewPath: '/assets/icon/img-placeholder.svg', base64: '', imageId: '' };
  
  isSelectedRegistrationImage1 = false;
  isSelectedRegistrationImage2 = false;
  isSelectedInsuranceImage = false;
  isSelectedNvBusinessImages = false;

  async uploadRegistrationImage1() {
    this.registrationImage1 = await this.photoService.addNewToGallery();
    // this.cache.store('registrationImage1', JSON.stringify(this.registrationImage1));
    const uploadImage = {
      image: this.registrationImage1,
      backUrl: 'car-info',
      placeholderName: 'registrationImage1'
    }
    // this.cache.store('uploaded-image', JSON.stringify(uploadImage));
    const navExtras: NavigationExtras = {
      state: {
        data: uploadImage
      }
    };
    this.router.navigateByUrl('upload-id', navExtras);
    this.isSelectedRegistrationImage1 = true;
  }
  async uploadRegistrationImage2() {
    this.registrationImage2 = await this.photoService.addNewToGallery();
    // this.cache.store('registrationImage2', JSON.stringify(this.registrationImage2));
    const uploadImage = {
      image: this.registrationImage2,
      backUrl: 'car-info',
      placeholderName: 'registrationImage2'
    }
    const navExtras: NavigationExtras = {
      state: {
        data: uploadImage
      }
    };
    // this.cache.store('uploaded-image', JSON.stringify(uploadImage));
    this.router.navigateByUrl('upload-id', navExtras);
    this.isSelectedRegistrationImage2 = true;
  }
  async uploadInsuranceImage() {
    this.insuranceImage = await this.photoService.addNewToGallery();
    // this.cache.store('insuranceImage', JSON.stringify(this.insuranceImage));
    const uploadImage = {
      image: this.insuranceImage,
      backUrl: 'car-info',
      placeholderName: 'insuranceImage'
    }
    const navExtras: NavigationExtras = {
      state: {
        data: uploadImage
      }
    };
    // this.cache.store('uploaded-image', JSON.stringify(uploadImage));
    this.router.navigateByUrl('upload-id', navExtras);
    this.isSelectedInsuranceImage = true;
  }
  async successModal() {
    const modal = await this.modalCtrl.create({
      component: SuccessPage,
      cssClass: 'cancelRideModal',
    });
    modal.onDidDismiss().then(() => {

    });
    return await modal.present();
  }

  async uploadNvBusinessImage() {
    this.nvBusinessImage = await this.photoService.addNewToGallery();
    // this.cache.store('nvBusinessImage', JSON.stringify(this.nvBusinessImage));
    const uploadImage = {
      image: this.nvBusinessImage,
      backUrl: 'car-info',
      placeholderName: 'nvBusinessImage'
    }
    const navExtras: NavigationExtras = {
      state: {
        data: uploadImage
      }
    };
    // this.cache.store('uploaded-image', JSON.stringify(uploadImage));
    this.router.navigateByUrl('upload-id', navExtras);
    this.isSelectedNvBusinessImages = true;
  }

  async getVehicleList() {

    try {
      // this.loadingService.present();
      const response: any = await this.apiHelperService.getVehicleTypeList();
      // this.loadingService.dismiss();
      console.log('response', response);
      if (response.status == true) {
        this.categoryList = response.data;
        console.log(this.categoryList)
      }
      if (response.status == false) {
        // this.loadingService.dismiss();
        this.alertService.presentErrorAlert('Sorry, Failed to fetch car categoris.')
      }

    }
    catch (error: any) {
      // this.loadingService.dismiss();
      this.alertService.presentErrorAlert(error.error.message);
    }
    finally {
      // this.loadingService.dismiss(true);
    }
  }
}
