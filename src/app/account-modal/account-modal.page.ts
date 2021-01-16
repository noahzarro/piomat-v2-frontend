import { Component, OnInit } from '@angular/core';
import { ModalController} from '@ionic/angular';  

@Component({
  selector: 'app-account-modal',
  templateUrl: './account-modal.page.html',
  styleUrls: ['./account-modal.page.scss'],
})
export class AccountModalPage implements OnInit {

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
  }

}
