import { Component, Injector, OnInit } from '@angular/core';
import { ModalController} from '@ionic/angular';
import { BasePage } from 'src/app/base.page';
import { FormControl, Validators } from '@angular/forms';
import { CardModalPage } from 'src/app/modals/card-modal/card-modal.page';
import { SuccessPage } from 'src/app/modals/success/success.page';
import { Fields } from 'src/app/common/fields.interface';
import { ApiHelperService } from 'src/app/services/api/api-helper.service';
@Component({
  selector: 'app-subscription-renewal',
  templateUrl: './subscription-renewal.page.html',
  styleUrls: ['./subscription-renewal.page.scss'],
})
export class SubscriptionRenewalPage extends BasePage {
  balance:any = 0;
  tokenPrice:number;
  tokenArr:any;
  showBalLoading:boolean = false;
  subscription: any = {
    name : '',
    price : 0
  };
  constructor(injector: Injector,public modalController: ModalController,private apiHelper:ApiHelperService) {
    super(injector)
  }

  async ngOnInit() {
    await this.initForm();
  }

  ionViewWillEnter(): void {
    this.calPrice();
    this.getBalance();
    this.getTokenPrice();
    this.getSubscriptionPrice();
  }

  async getTokenPrice(){
const response = (await this.apiHelper.getTokenPrice()).subscribe((res:any)=>{
  this.tokenPrice = res.token.token_per_price;
  console.log(this.tokenPrice);
  this.tokenArr = [
    {
      price: 100*this.tokenPrice,
      token: 100
    },
    {
      price: 50*this.tokenPrice,
      token: 50
    }
  ];
  // console.log(this.tokenPrice);
});
  }

  async getSubscriptionPrice(){
    const response = (await this.apiHelper.getSubscriptionPrice()).subscribe((res:any)=>{
      console.log(res);
      this.subscription.name = res.Subscription.subscription_name,
        this.subscription.price = res.Subscription.price


      console.log(this.subscription)
      // console.log(this.tokenPrice);
    });
      }

  fields: Array<string> = ['token', 'price'];

  initForm() {
    const obj: Fields = {
    };
    this.fields.forEach(field => {
      obj[field] = new FormControl(100, Validators.required);
    });
    this.ngForm = this.formBuilder.group(obj);
    this.ngForm.value.price = this.ngForm.value.token * 1.5
  }
  async successModal(heading:any, message:any) {
    const modal = await this.modalController.create({
      component: SuccessPage,
      cssClass:'cancelRideModal',
      componentProps: {
        'model_title': "Nomadic model's reveberation",
        heading,
        message
      }
    });
    modal.onDidDismiss().then(async ()=>{
      await this.getBalance();
    })
    return await modal.present();
  }
  async handleRenewClick(){
    const modal = await this.modalCtrl.create({
      component: CardModalPage,
      cssClass: 'cancelRideModal',
    });
    modal.onDidDismiss().then(async (resp) => {
      if(resp?.data?.purchased){
        let message = `Your are successfully subscribed to monthly package.`
        await this.successModal('Subscribed Monthly Package', message);
      }

    });
    return await modal.present();
  }

  async handleAddClick() {

    this.fields.forEach(field => {
      this.ngForm.controls[field].markAsTouched();
    });

    // this.ngForm.touched;
    if (this.ngForm.valid) {
      this.submitAttempted = true;
      try {
        this.showLoadingSpin = true;
        const input: Fields = {};
        this.fields.forEach(field => {
          input[field] = this.ngForm.value[field];
        });
        console.log(input['price']);
        input['price'] = Number(input['price'].split('$')[0])
        console.log('input', input);
        const response: any = await this.apiHelperService.purchaseToken(input);
        this.submitAttempted = false;
        if (response.status == true) {
          let message = `Your purchase for ${input['token']} is successfull.`
          this.successModal('Purchase Successfull', message);
        }
        else {
          this.alertService.presentErrorAlert(response.message)
        }

      }
      catch (error: any) {
        this.submitAttempted = false;
        this.showLoadingSpin = false;
        this.alertService.presentErrorAlert(error.error.message);
      }
      finally {
        this.submitAttempted = false;
        this.showLoadingSpin = false;
      }
    }
  }

  async getBalance(){
    try {
      this.showBalLoading = true;
      const response: any = await this.apiHelperService.getBalance();
      this.showLoadingSpin = false;
      if (response.status == true) {
        this.balance= response?.data?.price;
      }
      else {
        this.showBalLoading = false;
        this.alertService.presentErrorAlert('Sorry, Failed to fetch balance.')
      }

    }
    catch (error: any) {
      this.showBalLoading = false;
      this.alertService.presentErrorAlert(error.error.message);
    }
    finally {
      this.showBalLoading = false;
    }
  }

  addToken(){
    this.ngForm.controls['token'].patchValue((this.ngForm.value.token + 1));
    this.ngForm.controls['price'].patchValue((this.ngForm.value.token * 1.5).toFixed(0)+'$');
  }

  calPrice(){
    this.ngForm.controls['token'].patchValue((this.ngForm.value.token));
    this.ngForm.controls['price'].patchValue((this.ngForm.value.token * 1.5)+'$');
  }
}
