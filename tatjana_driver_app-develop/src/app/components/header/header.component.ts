import { NotificationsPage } from './../../modals/notifications/notifications.page';
import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() bellIcon:any;
  notifyIcon:any = '/assets/icon/bell-nodot.svg';
  constructor(public modalController: ModalController) {}

  ngOnInit() {
  }
  ngOnChanges(){
    this.notifyIcon = this.bellIcon;
  }
  ionViewWillEnter(){
    // this.notifyIcon = this.bellIcon;
  }

  async openNotifications() {
    this.notifyIcon = '/assets/icon/bell-nodot.svg';
    const modal = await this.modalController.create({
      component: NotificationsPage,
    });
    return await modal.present();
  }


}
