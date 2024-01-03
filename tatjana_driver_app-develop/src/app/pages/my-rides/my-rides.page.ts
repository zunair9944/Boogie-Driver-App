import { Component, OnInit, Injector } from '@angular/core';
import { BasePage } from 'src/app/base.page';

@Component({
  selector: 'app-my-rides',
  templateUrl: './my-rides.page.html',
  styleUrls: ['./my-rides.page.scss'],
})
export class MyRidesPage extends BasePage {

  rideList:any = [];
  constructor(inj: Injector) { super(inj) }

  ngOnInit() {
  }

  async ionViewWillEnter(){
    await this.getRideHistory();
  }

  async getRideHistory() {
    try {
      this.loadingService.present();
      const response: any = await this.apiHelperService.getRideHistory();
      console.log('response', response);
      if (response.status == true) {
        // debugger
        this.rideList = response.data;
        this.loadingService.dismiss();
      }
      if (response.status == false) {
        this.alertService.presentErrorAlert('Sorry, Failed to fetch rides history.')
      }

    }
    catch (error: any) {
      this.alertService.presentErrorAlert(error.error.message);
    }
    finally {
      this.loadingService.dismiss(true);
    }
  }

}
