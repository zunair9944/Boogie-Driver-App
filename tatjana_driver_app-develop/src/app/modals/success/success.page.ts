import { Component, Injector, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-success',
  templateUrl: './success.page.html',
  styleUrls: ['./success.page.scss'],
})
export class SuccessPage implements OnInit {

  @Input() heading:any = 'Heading';
  @Input() message:any = 'Hi, it\'s success message.';
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
