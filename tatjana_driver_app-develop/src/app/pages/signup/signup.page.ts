import { ChangeDetectorRef, Component, Injector, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BasePage } from 'src/app/base.page';
import { Fields } from 'src/app/common/fields.interface';
import { ConfirmPasswordValidator } from 'src/app/validaors/confirm-password.validator';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})

export class SignupPage extends BasePage {

  splashBgTop = 'assets/icon/orange_bg.svg';
  loginbgCenter = 'assets/icon/blue_bg_login.svg';
  hello = 'assets/icon/hello.svg';
  shakeEffect: boolean = false;
  showCnt: any
  loginError: string = '';
  showLoadingSpin: boolean = false;
  auth_id:any;
  addMode:any = true;
  showSignup:boolean = true;
  constructor(private ref: ChangeDetectorRef, injector: Injector) {
    super(injector)

  }

  ngOnInit() {
    window.addEventListener('ionKeyboardDidShow', ev => {
      this.showSignup = false;
      // const { keyboardHeight } = ev;
      // Do something with the keyboard height such as translating an input above the keyboard.
    });
    
    window.addEventListener('ionKeyboardDidHide', () => {
      this.showSignup = true;
      // Move input back to original location
    });
    this.initForm();
    this.showLoadingSpin = false;
  }

  async ionViewWillEnter() {
    let userIfo = this.cache.get('user_info') || ''
    if (userIfo) {
      let data = JSON.parse(userIfo);
      this.auth_id = data.id;
      if(this.auth_id){
        this.addMode = false;
        this.loadingService.present();
        const response:any = await this.apiHelperService.getProfile();
        this.loadingService.dismiss();
        if(response && response.data){
          const respData = response.data;

          // Basic Info
          const basicInfo = {
            email : respData['email'],
            phonenumber : respData['contact_number'],
            password : '*******', //respData['password'],
            retype_password : '*******', //respData['password'],
            username : respData['username'],

          }
          this.cache.store('signup-info', JSON.stringify(basicInfo));

          // Personal Info
          const personalInfo = {
            first_name : respData['first_name'],
            last_name : respData['last_name'],
            mobile : respData['contact_number'],
            email : respData['email'],
            address : respData?.address,
            city : respData?.driver_detail?.city,
            state : respData?.driver_detail?.state,
            zip : respData?.driver_detail?.zip,

          }
          
          let aboutMeInfo = {
            next_place  : respData?.about_me_detail?.next_place,
            movie : respData?.about_me_detail?.movie, 
            fun_fact : respData?.about_me_detail?.fun_fact, 
            live_without : respData?.about_me_detail?.live_without, 
            obsessed_with : respData?.about_me_detail?.obessed_with, 
            next_time : respData?.about_me_detail?.next_time, 
            fear : respData?.about_me_detail?.fear
          }
          this.cache.store('aboutMe', JSON.stringify(aboutMeInfo));

          let licenseImage1 = {
            webviewPath: respData.driver_licence,
            imageId: respData['driver_licence_id']
          }

          let licenseImage2 = {
            webviewPath: respData.business_licence,
            imageId: respData['business_licence_id']
          }
          // debugger
          this.cache.store('licenseImage1', JSON.stringify(licenseImage1))
          this.cache.store('is_licenseImage1', respData?.is_driver_licence);
          this.cache.store('licenseImage2', JSON.stringify(licenseImage2))
          this.cache.store('is_licenseImage2', respData?.is_business_licence);
          this.cache.store('personal-info', JSON.stringify(personalInfo));

          // Car Information
          let selectedCard:any = respData['cards'].filter((item:any) => item.id && item.id == respData?.user_detail?.card_id)
          
          const carInfo = {
            car_category_id : respData?.driver_detail?.car_category_id,
            make : respData?.driver_detail?.car_model,
            model : respData?.driver_detail?.car_made_in,
            plateNumber : respData?.driver_detail?.car_plate_number,
            card_number: selectedCard.length ? selectedCard[0].id : null
          }
          this.cache.store('cardsArr', JSON.stringify(respData['cards']));
          let registrationImage1 = {
            webviewPath: respData.vehicle_registration_document,
            imageId: respData['vehicle_registration_document_id']
          }

          let registrationImage2 = {
            webviewPath: respData.vehicle_registration_document_2,
            imageId: respData['vehicle_registration_document_2_id']
          }
          let insuranceImage = {
            webviewPath: respData.insurance_inspection,
            imageId: respData['insurance_inspection_id']
          }
          // debugger
          let nvBusinessImage = {
            webviewPath: respData.nv_business_image,
            imageId: respData['nv_business_image_id']
          }

          this.cache.store('registrationImage1', JSON.stringify(registrationImage1))
          this.cache.store('registrationImage2', JSON.stringify(registrationImage2))
          this.cache.store('insuranceImage', JSON.stringify(insuranceImage))
          this.cache.store('nvBusinessImage', JSON.stringify(nvBusinessImage))
          this.cache.store('car-info', JSON.stringify(carInfo));
          setTimeout(()=>{
            this.router.navigateByUrl('personal-info');
          },500)
        }
      }
    }
    await this.getCashedValues();
  }

  getCashedValues = async () =>{
    let signupValues:any = this.cache.get('signup-info')
    if(signupValues){
      // signupValues = this.cache.get('signup-info') || ''
      signupValues = signupValues ? JSON.parse(signupValues) : null;
      console.log('signupValues....', signupValues)
      if(signupValues && Object.keys(signupValues).length){
        Object.keys(signupValues).forEach(name => {
          if (this.ngForm.controls[name]) {
            this.ngForm.controls[name].patchValue(signupValues[name]);
          }
        });
      }      
    }
  }
  fields: Array<string> = ['username', 'email', 'password', 'confirmPassword'];

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
          case 'password':
            obj[field] = new FormControl('', [
              Validators.minLength(8),Validators.min(8), Validators.required
            ])
            // password: new FormControl('', [ Validators.minLength(8),Validators.min(8), Validators.required ]),
            // retype_password: new FormControl('', [ Validators.minLength(8),Validators.min(8), Validators.required ])
          break;
          case 'confirmPassword':
            obj[field] = new FormControl('', [
              Validators.minLength(8),Validators.min(8), Validators.required
            ])
            // password: new FormControl('', [ Validators.minLength(8),Validators.min(8), Validators.required ]),
            // retype_password: new FormControl('', [ Validators.minLength(8),Validators.min(8), Validators.required ])
          break;
        default:
          obj[field] = new FormControl('', Validators.required)
          break;
      }

    });

    this.ngForm = this.formBuilder.group(obj,{
      validator: ConfirmPasswordValidator("password", "confirmPassword")
    });
  }

  get f() {
    return this.ngForm.controls;
  }

  async handleNextClick() {

    this.fields.forEach(field => {
      this.ngForm.controls[field].markAsTouched();
    });

    this.shakeEffect = false;
    if (this.ngForm.valid) {
    this.submitAttempted = true;
      this.showLoadingSpin = true;

      try {

        const input: Fields = {};
        this.fields.forEach(field => {
          input[field] = this.ngForm.value[field];
        });
        this.loginError = '';
        this.cache.store('signup-info', JSON.stringify(input));
        if(!this.addMode){
          this.router.navigateByUrl('personal-ifno');
          return
        }
        this.router.navigateByUrl('phone-verify');
      } catch (error: any) {
        this.alertService.presentErrorAlert(error.error.message);
      } finally {
        this.showLoadingSpin = false;
      }

    }

  }

}
