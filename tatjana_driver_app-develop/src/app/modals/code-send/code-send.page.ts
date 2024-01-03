import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-code-send',
  templateUrl: './code-send.page.html',
  styleUrls: ['./code-send.page.scss'],
})
export class CodeSendPage implements OnInit {
  
  @ViewChild(IonModal) modal: IonModal;
  
  phone: string;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');    
  }



}
