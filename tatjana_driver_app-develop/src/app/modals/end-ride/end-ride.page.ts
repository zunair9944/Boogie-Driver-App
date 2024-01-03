import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-end-ride',
  templateUrl: './end-ride.page.html',
  styleUrls: ['./end-ride.page.scss'],
})
export class EndRidePage implements OnInit {
  @Input() data:any;
  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() {
  }
  async closeModel() {
    const close: string = "Modal Removed";
    await this.modalController.dismiss(close);
  }

}
