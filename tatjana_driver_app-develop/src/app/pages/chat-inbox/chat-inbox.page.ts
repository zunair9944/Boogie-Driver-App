import { Component, Injector, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { BasePage } from 'src/app/base.page';

@Component({
  selector: 'app-chat-inbox',
  templateUrl: './chat-inbox.page.html',
  styleUrls: ['./chat-inbox.page.scss'],
})
export class ChatInboxPage extends BasePage {

  message = '';
  contacts: any = [];
  backRoute:any = 'home'
  fetchmsgInterval:any;
  constructor(injector: Injector) {
    super(injector)
    this.ngForm = this.formBuilder.group({
      'message' : new FormControl()
    });
  }

  override ngOnInit(): void {
  }
  override async ionViewWillEnter() {
    if (history.state.data) {
      let data = history.state.data;
      this.backRoute = data.backRoute;
    }
    this.contacts = await this.getInboxContacts(true);
    this.fetchmsgInterval = setInterval(async ()=>{
      this.contacts = await this.getInboxContacts(false);
    },10000)
  }

  ionViewWillLeave(): void {
    clearInterval(this.fetchmsgInterval);
  }
  async openChat(contact:any) {
    const navExtras: NavigationExtras = {
      state: {
        data: {to_user: contact.user,rider_id: contact.user.id, backRoute: 'chat-inbox'}
      }
    };
    this.cache.store('messenger_id', contact.user.id);
    this.router.navigateByUrl('chat', navExtras)
  }

  async getInboxContacts(showLoader:any = true){
    try{
      showLoader && this.loadingService.present();
      let response:any  = await this.apiHelperService.getInboxContacts();
      showLoader && this.loadingService.dismiss();
      if(response){
        return response.contacts;
      }else{
        return [];
      }
    }catch(ex:any){
      showLoader && this.loadingService.dismiss();
      this.alertService.presentErrorAlert(ex.message);
    }
    
  }

  getTickImageSrc(contact:any){
    let imgSrc = '/assets/icon/two-check-grey.svg';
    // if(contact.sent){
    //   imgSrc = '/sent';
    // }
    // if(contact.delivered){
    //   imgSrc = '/delivered';
    // }
    if(contact.custom_message?.seen == 0){
      imgSrc = '/assets/icon/two-check-grey.svg';
    }
    if(contact.custom_message?.seen == 1){
      imgSrc = '/assets/icon/two-check-green.svg';
    }
    return imgSrc;
  }

  goBack(){
    this.router.navigateByUrl(this.backRoute);
  }
}
