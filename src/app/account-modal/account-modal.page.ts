import { CardModalPage } from './../card-modal/card-modal.page';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AlertController, ToastController } from '@ionic/angular';

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
  @Input() stickers_collection: Array<number>;
  @Input() stickers_selected: number;
  @Input() sticker_names: Object;

  constructor(public modalCtrl: ModalController, public alertController: AlertController, private toastController: ToastController, private http: HttpClient) { }

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

  getStickerImageURL(sid) {
    return environment.baseUrl + 'stickers/image/' + sid.toString()
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
        const card_uid = return_data.data.card_uid 
        if (this.cards.includes(card_uid)) {
          this.displayToast("Die Charte hesch scho inzuegfüegt - Trottel", "danger")
          return
        }
        this.cards.push(card_uid)
        this.displayToast("Charte erfolgrich hinzuegfüegt", "success")
        console.log(this.cards)
      }
      else {
        this.displayToast("Charte hinzuefüege het nöd klappet", "danger")
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
