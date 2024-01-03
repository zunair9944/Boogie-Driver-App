import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base.page';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage extends BasePage {

  auth_id:any;
  faqList:any = [];
  constructor(injector: Injector) { super(injector) }

  ngOnInit() {
  }

  ionViewWillEnter(): void {
    this.getFAQs()
  }

  async getFAQs() {
    try {
      this.loadingService.present();
      const response: any = await this.apiHelperService.getFAQs();
      console.log('response', response);
      if (response.status == true) {
        this.faqList = response.data;
        this.loadingService.dismiss();
      }
      if (response.status == false) {
        this.alertService.presentErrorAlert('Sorry, Invalid username/password')
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
