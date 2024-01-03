import { ChangeDetectorRef, Component, Injector } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BasePage } from 'src/app/base.page';
import { AutguardService } from 'src/app/services/auth/autguard.service';
import { NavigationExtras } from '@angular/router';
import { Fields } from 'src/app/common/fields.interface';
import { UsersService } from 'src/app/services/user/user.service';
import { ForgotPasswordModalPage } from 'src/app/modals/forgot-password-modal/forgot-password-modal.page';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})

export class SigninPage extends BasePage {

  splashBgTop = 'assets/icon/orange_bg.svg';
  loginbgCenter = 'assets/icon/blue_bg_login.svg';
  hello = 'assets/icon/hello.svg';
  shakeEffect: boolean = false;
  showCnt: any
  loginError: string = '';
  show = false;
  showSignup:boolean = true;
  constructor(private userService: UsersService,private ref: ChangeDetectorRef, injector: Injector, private Authguardservice: AutguardService) {
    super(injector)

  }

  async ionViewWillEnter() {
    this.showCnt = true;
    let isAuth = await this.Authguardservice.gettoken();
    if (isAuth) {
      this.router.navigateByUrl("/home");
    }
    if (history.state.data) {
      this.loginError = history.state.data.error.replace(/<[^>]+>/g, '');
    }
    this.showLoadingSpin = false;
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
  }

  fields: Array<string> = ['username', 'password'];

  initForm() {
    const obj: Fields = {};
    this.fields.forEach(field => {
      obj[field] = new FormControl('', Validators.required);
    });

    this.ngForm = this.formBuilder.group(obj);
  }
  async forgotPassword() {
    const modal = await this.modalCtrl.create({
      component: ForgotPasswordModalPage,
      cssClass:'cancelRideModal',
      componentProps: {
        'model_title': "Nomadic model's reveberation"
      }
    });
    modal.onDidDismiss()
    return await modal.present();
  }
  async handleSigninClick() {

    this.fields.forEach(field => {
      this.ngForm.controls[field].markAsTouched();
    });

    this.shakeEffect = false;
    // this.ngForm.touched;
    if (this.ngForm.valid) {
    this.submitAttempted = true;

      try {
        // this.loadingService.present();
        this.showLoadingSpin = true;
        // Step 1 : Check for maintance mode        
        const input: Fields = {};
        this.fields.forEach(field => {
          input[field] = this.ngForm.value[field];
        });
        // input['type'] = 'driver';
        console.log('input', input);
        // Step 2 : Login Thru API
        this.loginError = '';
        // this.cache.store('test',input);
        const response: any = await this.authService.authenticate(input['username'], input['password']);

        // console.log('response', response);
        if (response.status == true) {
          this.cache.store('login_time', new Date())
          this.cache.store('token', response.data.api_token);
          localStorage.setItem('token', response.data.api_token);
          this.cache.store('user_info', JSON.stringify(response.data));
          this.cache.store('userName', response?.data.first_name+' '+ response?.data.last_name || '' );
          this.cache.store('profile_image',response?.data.profileImage);
          this.cache.store('is_profile_image_uploaded', response?.data.is_profile_image_uploaded);
          this.userService.editUserName(response?.data.first_name+' '+ response?.data.last_name || '');
          this.userService.editUserImg(response?.data.profileImage);          
          await this.notify();
          await this.router.navigateByUrl('/home');
          // this.loadingService.dismiss();
        }
        else {
          this.alertService.presentErrorAlert('Sorry, Invalid username/password')
        }

      }
      catch (error: any) {
        this.alertService.presentErrorAlert(error.error.message);
      }
      finally {
        // this.loadingService.dismiss(true);
        this.showLoadingSpin = false;
      }
    }
  }

  onSignUp() {
    const extra: NavigationExtras = {
      state: { nextRoute: 'user-info', backRoute: 'login', isSignUp: true }
    };
    this.router.navigateByUrl('language', extra);
  }

  onForgetPassword() {
    this.router.navigateByUrl('user-verification');
  }

  get f() {
    return this.ngForm.controls;
  }

  password() {
    this.show = !this.show;
  }

  async notify(){
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

  // async forgotPassword() {
  //   const modal = await this.modalCtrl.create({
  //     component: ForgotPasswordModalComponent,
  //     cssClass:'cancelRideModal',
  //     componentProps: {
  //       'model_title': "Nomadic model's reveberation"
  //     }
  //   });
  //   modal.onDidDismiss()
  //   return await modal.present();
  // }
}