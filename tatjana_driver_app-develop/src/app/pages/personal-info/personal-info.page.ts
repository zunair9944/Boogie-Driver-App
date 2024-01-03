import { ChangeDetectorRef, Component, Injector, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { BasePage } from 'src/app/base.page';
import { Fields } from 'src/app/common/fields.interface';
import { Photo } from 'src/app/common/photo.interface';
import { PhotoService } from 'src/app/services/photo.service';


@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.page.html',
  styleUrls: ['./personal-info.page.scss'],
})

export class PersonalInfoPage extends BasePage {

  splashBgTop = 'assets/icon/orange_bg.svg';
  loginbgCenter = 'assets/icon/blue_bg_login.svg';
  hello = 'assets/icon/hello.svg';
  shakeEffect: boolean = false;
  showCnt: any
  loginError: string = '';
  showLoadingSpin: boolean = false;
  auth_id:any;
  addMode:any = true;
  disabled:boolean = true;
  isLicenseImage1Uploaded:any;
  isLicenseImage2Uploaded:any;
  constructor(private ref: ChangeDetectorRef, injector: Injector, public photoService: PhotoService) {
    super(injector)
    // let userIfo = this.cache.get('user_info') || ''
    // if (userIfo) {
    //   let data = JSON.parse(userIfo);
    //   this.auth_id = data.id;
    //   if(this.auth_id){
    //     this.addMode = false;
    //   }
    // }
    this.isLicenseImage1Uploaded = this.cache.get("is_licenseImage1") || this.isLicenseImage1Uploaded;
    this.isLicenseImage2Uploaded = this.cache.get("is_licenseImage2") || this.isLicenseImage2Uploaded;
  }

  async ngOnInit() {
    this.initForm();
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
    
    this.showLoadingSpin = false;
    this.submitAttempted = false;
    this.nextClicked = false;

    // let userIfo = this.cache.get('user_info') || ''
    // if (userIfo) {
    //   let data = JSON.parse(userIfo);
    //   this.auth_id = data.id;
    //   if(this.auth_id){
    //     this.addMode = false;
    //   }
    // }

    // const uploadedPhoto: any = this.cache.get('uploaded-image');
    let uploadedPhoto: any;
    if (history.state.data) {
      uploadedPhoto = history.state.data
    }
    if (uploadedPhoto) {

      // console.log('cahce=> ', JSON.parse(uploadedPhoto));

      const uploadImage = uploadedPhoto;
      this.cache.delete('uploaded-image');
      switch (uploadImage.placeholderName) {

        case 'licenseImage1':
          this.cache.store('licenseImage1', JSON.stringify(uploadImage.image));
          // let img = this.cache.get('licenseImage1');
          // console.log('licenseImage1 new cache =======>', img);
          this.licenseImage1 = uploadImage.image;
          this.isSelectedLicenseImage1 = true;
          break;
        case 'licenseImage2':
          this.cache.store('licenseImage2', JSON.stringify(uploadImage.image));
          this.licenseImage2 = uploadImage.image;
          this.isSelectedLicenseImage2 = true;
          break;

        default:
          break;
      }
    }
    this.getCashedValues();
  }

  getCashedValues = async () => {
    let licenseImage1:any = this.cache.get('licenseImage1');
    if(licenseImage1){
      const uploadImage =  JSON.parse(licenseImage1);
      this.licenseImage1 = uploadImage;
      this.isSelectedLicenseImage1 = true;
    }

    let licenseImage2:any = this.cache.get('licenseImage2')
    if(licenseImage2){
      const uploadImage = JSON.parse(licenseImage2);
      this.licenseImage2 = uploadImage;
      this.isSelectedLicenseImage2 = true;
    }

    let personalInfoValues: any = this.cache.get('personal-info')
    if (personalInfoValues) {
      // personalInfoValues = this.cache.get('personal-info') || ''
      personalInfoValues = personalInfoValues ? JSON.parse(personalInfoValues) : null;
      // console.log('personalInfoValues....', personalInfoValues)
      if (personalInfoValues && Object.keys(personalInfoValues).length) {
        Object.keys(personalInfoValues).forEach(name => {
          if (this.ngForm.controls[name]) {
            this.ngForm.controls[name].patchValue(personalInfoValues[name]);
          }
        });
      }
    }
  }
  async resetImageCache() {
    this.licenseImage1 = { webviewPath: '/assets/icon/img-placeholder.svg', base64: '', imageId: '' };
    this.licenseImage2 = { webviewPath: '/assets/icon/img-placeholder.svg', base64: '', imageId: '' };
    this.cache.delete('uploaded-image');
    this.cache.delete('licenseImage1');
    this.cache.delete('licenseImage2');
  }

  fields: Array<string> = ['first_name', 'last_name', 'mobile', 'email', 'city', 'state', 'zip', 'address'];

  // address2: any = '';

  initForm() {
    const obj: Fields = {};
    this.fields.forEach(field => {
      switch (field) {
        case 'email':
          obj[field] = new FormControl('', [
            Validators.required,
            Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
          ])
          break;
        // case 'address':
        //   obj[field] = new FormControl()
        //   break;
        default:
          obj[field] = new FormControl('', Validators.required)
          break;
      }

    });

    this.ngForm = this.formBuilder.group(obj);
    // let phone: any = this.cache.get('phone-info');
    // if(phone){
    //   let json = JSON.parse(phone);
    //   this.ngForm.controls['mobile'].patchValue(json.phone);
    // }
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
        this.cache.store('personal-info', JSON.stringify(input));
        if(!this.addMode){
          this.router.navigateByUrl('car-info');
        }else{
          this.router.navigateByUrl('about-me');
        }
        // car-info

      } catch (error: any) {
        this.alertService.presentErrorAlert(error.error.message);
      } finally {
        this.showLoadingSpin = false;
      }

    }
    return null;
  }


  isValidLicenseImage1() {
    if (!this.nextClicked) {
      return true;
    }
    return this.validateLicenseImage1();
  };
  validateLicenseImage1() {
    if (this.isSelectedLicenseImage1) {
      return true;
    }
    else {
      return false;
    }
  }
  isValidLicenseImage2() {
    if (!this.nextClicked) {
      return true;
    }
    return this.validateLicenseImage2();
  };
  validateLicenseImage2() {
    if (this.isSelectedLicenseImage2) {
      return true;
    }
    else {
      return false;
    }
  }



  handleImageValidation() {
    const v1 = this.isValidLicenseImage1();
    const v2 = this.isValidLicenseImage2();

    if (v1 && v2) {
      return true;
    }
    return false;
  }

  licenseImage1: Photo = { webviewPath: '/assets/icon/img-placeholder.svg', base64: '/assets/icon/img-placeholder.svg', imageId: '' };
  licenseImage2: Photo = { webviewPath: '/assets/icon/img-placeholder.svg', base64: '/assets/icon/img-placeholder.svg', imageId: '' };

  isSelectedLicenseImage1 = false;
  isSelectedLicenseImage2 = false;


  async uploadDriverLicense() {
    if(this.isLicenseImage1Uploaded){
      this.alertService.presentAlert('Alert', 'Sorry, you cannot update this document once uploaded.',['OK'])
      return;
    }
    this.licenseImage1 = await this.photoService.addNewToGallery();
    // debugger
    // this.cache.store('licenseImage1', JSON.stringify(this.licenseImage1));
    const uploadImage = {
      image: this.licenseImage1,
      backUrl: 'personal-info',
      placeholderName: 'licenseImage1'
    }
    // this.cache.store('uploaded-image', JSON.stringify(uploadImage));
    const navExtras: NavigationExtras = {
      state: {
        data: uploadImage
      }
    };
    this.router.navigateByUrl('upload-id', navExtras);
    this.isSelectedLicenseImage1 = true;
  }
  async uploadDriverLicense2() {
    // debugger
    if(this.isLicenseImage2Uploaded){
      this.alertService.presentAlert('Alert', 'Sorry, you cannot update this document once uploaded.',['OK'])
      return;
    }
    this.licenseImage2 = await this.photoService.addNewToGallery();
    // this.cache.store('licenseImage2', JSON.stringify(this.licenseImage2));
    const uploadImage = {
      image: this.licenseImage2,
      backUrl: 'personal-info',
      placeholderName: 'licenseImage2'
    }
    // this.cache.store('uploaded-image', JSON.stringify(uploadImage));
    const navExtras: NavigationExtras = {
      state: {
        data: uploadImage
      }
    };
    this.router.navigateByUrl('upload-id', navExtras);
    this.isSelectedLicenseImage2 = true;
  }

  goBack(): void {
    if(this.addMode){
      this.router.navigateByUrl('/verification-code');
      return
    }
    this.router.navigateByUrl('/')
  }
}
