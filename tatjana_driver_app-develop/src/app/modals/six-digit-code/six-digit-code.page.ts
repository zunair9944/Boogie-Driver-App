import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-six-digit-code',
  templateUrl: './six-digit-code.page.html',
  styleUrls: ['./six-digit-code.page.scss'],
})
export class SixDigitCodePage implements OnInit {

  @ViewChild(IonModal) modal: IonModal;
  
  phone: string;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');    
  }

  
}
