import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calling',
  templateUrl: './calling.page.html',
  styleUrls: ['./calling.page.scss'],
})
export class CallingPage implements OnInit {

  constructor(
    private modalController: ModalController,
  ) { }
  ngOnInit() { }
  async calcenRideModal() {
    const close: string = "Modal Removed";
    await this.modalController.dismiss(close);
  }

}
