import { CardModalPage } from './../card-modal/card-modal.page';
import { environment } from './../../environments/environment';
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

  sender: any = {"uid": -1, "vulgo": "Niemot", "balance": 0};
  receiver: any = {"uid": -1, "vulgo": "Niemot", "balance": 0};
  amount = 0;

  constructor(public modalCtrl: ModalController, private http: HttpClient, private toastController: ToastController) { }


  ngOnInit() {
  }

  displayToast(message: string, color: string) {
    this.toastController.create({
      message: message,
      position: 'top',
      duration: 7500,
      color: color
    }).then((toast) => { toast.present() });
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

  // returns a promise with the account data of a user identified by card, or a rejected promise
  async getAccount(){
    const modal = await this.modalCtrl.create({
      component: CardModalPage,
      componentProps: {}
    });
    await modal.present();
    return modal.onDidDismiss().then((return_data) => {
      console.log(return_data)
      if (return_data.data.found) {
        return this.http.get(environment.baseUrl + 'people/by_card/' + return_data.data.card_uid).toPromise()
        .then((person_data) => {
          console.log(person_data)
          return person_data
        })
        .catch(() => {
          // owner not found
          this.http.get(environment.baseUrl + 'failure').toPromise()
          this.displayToast("Die Charte ghört niemertem", "danger");
          return Promise.reject()
        })
      }
      else {
        // no card found
        this.http.get(environment.baseUrl + 'failure').toPromise()
        this.displayToast("Kei Charte gfunde", "danger");
        return Promise.reject()
      }
    })
  }

  async setSender() {
    this.getAccount().then(person_data => {
      console.log(person_data)
      this.sender = person_data;
    })
    .catch(err => console.log(err))
  }

  async setReceiver() {
    this.getAccount().then(person_data => {
      this.receiver = person_data;
    })
    .catch()
  }
  
  async sendMoney() {
    if (this.sender["uid"] == -1) {
      this.http.get(environment.baseUrl + 'failure').toPromise()
      this.displayToast("Wähl zerst en Sender us", "danger")
      return
    }
    if (this.receiver["uid"] == -1) {
      this.http.get(environment.baseUrl + 'failure').toPromise()
      this.displayToast("Wähl zerst en Empfänger us", "danger")
      return
    }

    if (this.sender["balance"] < this.amount * 100){
      this.http.get(environment.baseUrl + 'failure').toPromise()
      this.displayToast("D:ä" + this.sender["vulgo"] + " het nöd gnueg Geld", "danger")
      return
    }
    
    this.sender["balance"] -= this.amount * 100
    this.receiver["balance"] += this.amount * 100

    this.displayToast(this.amount + " Fr. überwise", "success")
    this.http.get(environment.baseUrl + 'success').toPromise()
    this.http.put(environment.baseUrl + 'people/' + String(this.sender["uid"]), this.sender).toPromise()
    this.http.put(environment.baseUrl + 'people/' + String(this.receiver["uid"]), this.receiver).toPromise()
  }

}
