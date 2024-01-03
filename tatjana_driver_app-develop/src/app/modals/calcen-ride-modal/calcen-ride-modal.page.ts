import { Component, Injector, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiHelperService } from 'src/app/services/api/api-helper.service';
// import { RideEndPage } from '../ride-end/ride-end.page';
import { BasePage } from 'src/app/base.page';

@Component({
  selector: 'app-calcen-ride-modal',
  templateUrl: './calcen-ride-modal.page.html',
  styleUrls: ['./calcen-ride-modal.page.scss'],
})
export class CalcenRideModalPage extends BasePage implements OnInit {
  data: any;
  @Input() presentHomeModal:any;
  constructor(
    private injector: Injector,
    private modalController: ModalController,
    private apiService: ApiHelperService
  ) {  super(injector)}
  ngOnInit() { }
  async closeModel() {
    await this.modalController.dismiss();
  }


  async handleCancleRideRequest() {
    
    try {
      this.submitAttempted = true;
      this.showLoadingSpin = true;
      const payload = {id: this.data.requestId}
      const response: any = await this.apiService.endTrip(payload);
      this.submitAttempted = false;
      this.showLoadingSpin = false;
      console.log('response', response);
      if (response.status == true) {
        this.modalController.dismiss({isEnded: true, rideResp: response.data});
      }

    }
    catch (e: any) {
      this.alertService.presentErrorAlert(e.error.message)

    }
    finally {
      this.submitAttempted = false;
    }

  }

}
