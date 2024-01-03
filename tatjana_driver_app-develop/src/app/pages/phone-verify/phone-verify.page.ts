import { Component, OnInit, ChangeDetectorRef, Injector, ViewChild } from '@angular/core';
import { ModalController, AnimationController } from '@ionic/angular';
import { CodeSendPage } from 'src/app/modals/code-send/code-send.page';
import { BasePage } from 'src/app/base.page';
import { Fields } from 'src/app/common/fields.interface';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-phone-verify',
  templateUrl: './phone-verify.page.html',
  styleUrls: ['./phone-verify.page.scss'],
})
export class PhoneVerifyPage extends BasePage {
  @ViewChild('content') private content: any;
  shakeEffect: boolean = false;
  phone: string = '';
  cCodeDefault: string = '+1';
  showLoadingSpin: boolean = false;
  submitAttempted: boolean = false;

  constructor(private ref: ChangeDetectorRef, injector: Injector, public modalController: ModalController) {
    super(injector)
    this.platform.keyboardDidShow.subscribe((ev: any) => {
      const { keyboardHeight } = ev;
      let that = this;
      setTimeout(() => { that.content.scrollToBottom(0); }, 0);
    });
    this.platform.keyboardDidHide.subscribe((ev: any) => {
      let that = this;
      setTimeout(() => { that.content.scrollToTop(0); }, 0);
    });
  }

  ngOnInit() {
    this.initForm();
    this.showLoadingSpin = false;
  }

  async ionViewWillEnter() {
    await this.getCashedValues();
  }

  getCashedValues = async () => {
    let otpValues: any = this.cache.get('phone-info');
    if (otpValues) {
      // otpValues = this.cache.get('phone-info') || ''
      otpValues = otpValues ? JSON.parse(otpValues) : null;
      console.log('otpValues....', otpValues)
      if (otpValues && Object.keys(otpValues).length) {
        Object.keys(otpValues).forEach(name => {
          if (this.ngForm.controls['phoneNumber']) {
            this.ngForm.controls['phoneNumber'].patchValue(otpValues['phone'].slice(2));
          }
        });
      }
    }
  }

  fields: Array<string> = ['countryCode','phoneNumber'];

  initForm() {
    const obj: Fields = {};
    this.fields.forEach(field => {
      obj[field] = new FormControl('', Validators.required);
    });

    this.ngForm = this.formBuilder.group(obj);
    this.ngForm.controls['countryCode'].patchValue(this.cCodeDefault);
  }

  get f() {
    return this.ngForm.controls;
  }

  async sendCode() {

    this.fields.forEach(field => {
      this.ngForm.controls[field].markAsTouched();
      this.ngForm.controls[field].markAsDirty();
    });


    this.shakeEffect = false;

    if (this.ngForm.valid) {
      this.submitAttempted = true;

      this.phone = this.ngForm.value['phoneNumber'];
      const input = { 'phone': `${this.ngForm.value.countryCode} ${this.phone}` };


      console.log('input', input);
      this.cache.store('phone-info', JSON.stringify(input));

      this.showLoadingSpin = true;
      try {

        const response: any = await this.authService.sendOtpCode();
        console.log('response', response);
        if (response.status == true) {
          this.loadingService.dismiss();
          this.openSuccessPopup();
        }
        else {
          console.log(response);
          this.alertService.presentErrorAlert('Something went wrong')
        }

      } catch (error: any) {
        
        this.alertService.presentErrorAlert(error.error.message);
      } finally {
        this.showLoadingSpin = false;
        this.submitAttempted = false;
      }

    }

  }

  async openSuccessPopup() {
    const modal = await this.modalController.create({
      component: CodeSendPage,
      cssClass: 'codeSend',
      componentProps: { 'phone': `${this.ngForm.value.countryCode} ${this.phone}` }
    });
    modal.present();
  }


}
