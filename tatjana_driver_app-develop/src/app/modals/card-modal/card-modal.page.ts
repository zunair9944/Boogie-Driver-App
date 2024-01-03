import { Component, Injector, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { BasePage } from 'src/app/base.page';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.page.html',
  styleUrls: ['./card-modal.page.scss'],
})
export class CardModalPage extends BasePage {
  modelData: any;
  shakeEffect: boolean = false;
  showLoadingSpin = false;
  showLoadingCard = false;
  @Input() model_title: string;
  cardArr:any = [];
  constructor(
    injector: Injector,
    private modalController: ModalController,
  ) { super(injector) }
  override ngOnInit() { this.initForm() }
  initForm(){
    this.ngForm = this.formBuilder.group({
      card_number: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
  }
  async ionViewWillEnter() {
    this.showLoadingCard = true;
    await this.getUserCardList();
    this.showLoadingCard = false;
  }
  async closeModel() {
    const close: string = "Modal Removed";
    await this.modalController.dismiss(close);
  }

  
  async getUserCardList() {

    try {
      const response: any = await this.apiHelperService.getUserCardList();
      console.log('response', response);
      if (response.status == true) {
        this.cardArr = response.data;
      }
      if (response.status == false) {
        this.alertService.presentErrorAlert('Sorry, Invalid username/password')
      }

    }
    catch (error: any) {
      this.alertService.presentErrorAlert(error.error.message);
    }
    finally {
      // this.loadingService.dismiss(true);
    }
  }
  async paynow(){
    this.ngForm.controls['card_number'].markAsTouched();
    this.shakeEffect = false;
    this.submitAttempted = true;
    // this.ngForm.touched;
    if (this.ngForm.valid) {
      try {
        // this.loadingService.present();
        this.showLoadingSpin = true;
        // Step 1 : Check for maintance mode        
        const input = {
          id: this.ngForm.value.card_number
        };
        console.log('input', input);
        // Step 2 : Login Thru API
        const response: any = await this.apiHelperService.subscription(input);
        this.showLoadingSpin = false;
        console.log('response', response);
        if(response.status == true){
          await this.modalController.dismiss({purchased: true});
        }
        if(response.status == false){
          this.alertService.presentErrorAlert('Sorry, Failed to subscribe monthly package.')
        }
        
      }
      catch (error:any) {
        this.alertService.presentErrorAlert(error.error.message);
        // console.log(error.response.status)
      }
      finally {
        // this.loadingService.dismiss(true);
        this.showLoadingSpin = false;
      }
    }
  }

  get f() {
    return this.ngForm.controls;
  }
}
