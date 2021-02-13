import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-money',
  templateUrl: './money.page.html',
  styleUrls: ['./money.page.scss'],
})
export class MoneyPage implements OnInit {

  sender = {"uid": -1, "vulgo": "Niemot", "balance": 0};
  receiver = {"uid": -1, "vulgo": "Niemot", "balance": 0};
  amount = 0;

  constructor(public modalCtrl: ModalController, private http: HttpClient, private toastController: ToastController) { }


  ngOnInit() {
  }

  increaseAmount(){
    this.amount+=1;
    if (this.amount > 100) {
      this.amount = 100
    }
  }

  decreaseAmount(){
    this.amount-=1;
    if (this.amount < 0) {
      this.amount = 0
    }
  }

}
