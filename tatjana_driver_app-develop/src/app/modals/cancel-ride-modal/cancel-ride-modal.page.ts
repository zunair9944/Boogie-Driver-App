import { EndRidePage } from './../end-ride/end-ride.page';
import { ModalController } from '@ionic/angular';
import { Component, Injector, Input, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base.page';

@Component({
  selector: 'app-cancel-ride-modal',
  templateUrl: './cancel-ride-modal.page.html',
  styleUrls: ['./cancel-ride-modal.page.scss'],
})
export class CancelRideModalPage extends BasePage implements OnInit {

  @Input() drawRoute: any;
  modelData: any;
  @Input() model_title: string;
  @Input() data:any;
  constructor(
    inj: Injector,
    private modalController: ModalController,
  ) { super(inj)}
  ngOnInit() { }
  async closeModel() {
    const close: string = "Modal Removed";
    await this.modalController.dismiss({isEnded: false});
  }

  async endTrip() {
    
    this.submitAttempted = true; this.showLoadingSpin = true;
    const payload = {id: this.data.requestId}
    const response:any = await this.apiHelperService.endTrip(payload);
    this.submitAttempted = false; this.showLoadingSpin = false;
    console.log(response);
    if(response.status == true){
      this.modalController.dismiss({isEnded: true, rideResp: response.data});
    }
    

  }

}
