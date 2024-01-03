import { Component, OnInit, ChangeDetectorRef, Injector, ViewChild } from '@angular/core';
import { ModalController, AnimationController, IonInput } from '@ionic/angular';
import { BasePage } from 'src/app/base.page';
import { SixDigitCodePage } from 'src/app/modals/six-digit-code/six-digit-code.page';
import { Fields } from 'src/app/common/fields.interface';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-verification-code',
  templateUrl: './verification-code.page.html',
  styleUrls: ['./verification-code.page.scss'],
})
export class VerificationCodePage extends BasePage {

  shakeEffect: boolean = false;
  phone: string = '';
  @ViewChild('content') private content: any;
  @ViewChild('code_0') code0: IonInput;
  @ViewChild('code_1') code1: IonInput;
  @ViewChild('code_2') code2: IonInput;
  @ViewChild('code_3') code3: IonInput;
  @ViewChild('code_4') code4: IonInput;
  @ViewChild('code_5') code5: IonInput;

  isCodeValid: boolean = false;
  resultReturn: boolean = false;
  showLoadingSpin: boolean = false;
  showLoadingSpinResendCode: boolean = false;
  isKeyboardShown: boolean = false;
  keyboardHeight: any = true;

  constructor(private ref: ChangeDetectorRef, injector: Injector, public modalController: ModalController) {
    super(injector)
    this.platform.keyboardDidShow.subscribe((ev:any) => {
      const { keyboardHeight } = ev;
      // console.log('keyboardHeight========>', keyboardHeight);
      // this.keyboardHeight = keyboardHeight;
      // this.isKeyboardShown = true;
      let that = this;
      setTimeout(()=>{that.content.scrollToBottom(0);},0);
      // Do something with the keyboard height such as translating an input above the keyboard.
    });
    this.platform.keyboardDidHide.subscribe((ev:any) => {
      // const { keyboardHeight } = ev;
      // console.log('keyboardHeight========>', keyboardHeight);
      // this.keyboardHeight = keyboardHeight;
      // this.isKeyboardShown = false;
      let that = this;
      setTimeout(()=>{that.content.scrollToTop(0);},0);
    });
  }

  timeLeftDefault: number = 120;
  timeLeft: number = this.timeLeftDefault;
  interval: any;
  continueDisable: boolean = false;
  resendDisable: boolean = true;

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        // @todo what to do when time runs out
        this.resendDisable = false;
        this.continueDisable = true;
        // console.log('timeout');
        this.timeLeft = 0;
      }
    }, 1000);
  }
  async ionViewWillEnter() {
    let phoneInfo: any = this.cache.get('phone-info');
    if(phoneInfo){
      let json = JSON.parse(phoneInfo);
      this.phone = json.phone;
      this.startTimer();
    }
    
  }

  ngOnInit() {
    this.showLoadingSpin = false;
    this.initForm();
  }

  fields: Array<string> = ['code_0', 'code_1', 'code_2', 'code_3', 'code_4', 'code_5'];

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

  async verifyCode() {
    let otpCode = '';
    this.fields.forEach(field => {
      this.ngForm.controls[field].markAsTouched();
      this.ngForm.controls[field].markAsDirty();
      otpCode += this.ngForm.value[field];
    });

    this.shakeEffect = false;

    if (this.ngForm.valid) {
    this.submitAttempted = true;


      this.showLoadingSpin = true;
      try {

        const response: any = await this.authService.verifyOtpCode(this.phone, otpCode);
        console.log('response', response);
        if (response.status == true) {
          this.continueDisable = true;
          this.isCodeValid = true;

          // redirect to next page after 1 sec delay
          var that = this;
          setTimeout(function () {
            that.router.navigateByUrl('/personal-info');
          }, 1000);

        }
        else {
          this.alertService.presentErrorAlert(response.message);
        }
      } catch (error: any) {
        this.alertService.presentErrorAlert(error.error.message);
      } finally {
        this.showLoadingSpin = false;
        this.resultReturn = true;
      }


    }

  }
  codeClass = 'valid-code';

  async resendOtpCode() {
    if (this.resendDisable) {
      return false;
    }

    this.showLoadingSpinResendCode = true;
    try {

      const response: any = await this.authService.sendOtpCode();
      if (response.status == true) {
        this.resendDisable = true;
        this.continueDisable = false;
        this.timeLeft = this.timeLeftDefault;
      }
      else {
        this.alertService.presentErrorAlert('Something went wrong')
      }

    } catch (error: any) {
      this.alertService.presentErrorAlert(error.error.message);
    } finally {
      this.showLoadingSpinResendCode = false;
    }
    this.openResendSuccessPopup();
    return true;
  }

  async openResendSuccessPopup() {
    const modal = await this.modalController.create({
      component: SixDigitCodePage,
      cssClass: 'codeSixSend',
      componentProps: { 'phone': this.phone }
    });
    modal.present();

  }

  handleKeyUp(event: any) {
    const name = event.target.name;
    if (event.key !== 'Tab') {
      switch (name) {
        case 'code_0':
          this.code1.setFocus()
          break;
        case 'code_1':
          this.code2.setFocus()
          break;
        case 'code_2':
          this.code3.setFocus()
          break;
        case 'code_3':
          this.code4.setFocus()
          break;
        case 'code_4':
          this.code5.setFocus()
          break;

        default:
          break;
      }
    }

  }

  handleKeyDown(event: any) {
    if (event.target.value.length == 1) return false;
    return event;
  }

  getClassOfCode(f: any, key: string) {
    let style = '';
    if ((f[key].dirty && f[key].touched && f[key].errors)) {
      style = "has-error";
    }
    else if (this.isCodeValid === false && this.resultReturn === true) {
      style = "invalid-code";
    }
    else if (this.isCodeValid === true && this.resultReturn === true) {
      style = "valid-code";
    }
    return style;
  }
}
