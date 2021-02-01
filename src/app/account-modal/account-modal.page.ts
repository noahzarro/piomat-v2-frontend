import { CardModalPage } from './../card-modal/card-modal.page';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-account-modal',
  templateUrl: './account-modal.page.html',
  styleUrls: ['./account-modal.page.scss'],
})
export class AccountModalPage implements OnInit {

  @Input() is_new: boolean;
  @Input() uid: number;
  @Input() surname: string;
  @Input() lastname: string;
  @Input() vulgo: string;
  @Input() cards: Array<string>;

  constructor(public modalCtrl: ModalController, public alertController: AlertController, private http: HttpClient) { }

  ngOnInit() {
  }

  removeCard(card_uid) {
    this.alertController.create({
      header: 'Würklich lösche?',
      buttons: [
        {
          text: 'Abbreche',
          role: 'cancel',
        }, {
          text: 'Jo',
          handler: () => {
            this.cards.splice(this.cards.findIndex(cur_card => card_uid == cur_card))
          }
        }
      ]
    }).then((alert)=>alert.present())

  }

  async addCard() {
    const modal = await this.modalCtrl.create({
      component: CardModalPage,
      componentProps: {}
    });
    await modal.present();
    modal.onDidDismiss().then((return_data) => {
      console.log(return_data)
      if (return_data.data.found) {
        this.cards.push(return_data.data.card_uid)
        console.log(this.cards)
      }
    })

  }

  save() {
    let new_data = { surname: this.surname, lastname: this.lastname, vulgo: this.vulgo, cards: this.cards }
    if (!this.is_new) {
      this.http.put(environment.baseUrl + 'people/' + this.uid, new_data).toPromise().then(
        () => {
          this.modalCtrl.dismiss()
        }
      )
    }
    else {
      this.http.post(environment.baseUrl + 'people', new_data).toPromise().then(
        () => {
          this.modalCtrl.dismiss()
        }
      )
    }

  }

}
