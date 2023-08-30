import { AccountModalPage } from './../account-modal/account-modal.page';
import { Component, OnInit } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.page.html',
  styleUrls: ['./accounts.page.scss'],
})
export class AccountsPage implements OnInit {

  people = []

  ionViewDidEnter() {
    this.getPeople();
  }

  constructor(private http: HttpClient, public modalController: ModalController) { }

  ngOnInit() {
  }

  getPeople() {
    this.http.get(environment.baseUrl + 'people').toPromise().then((people) => { this.people = people['people']; console.log(this.people) })
  }

  async getStickerName(sid) {
    console.log("requesting name: " + sid.toString())
    let name = await this.http.get(environment.baseUrl + 'stickers/name/' + sid.toString()).toPromise().then(
      (response) => {
        console.log("got name: " + sid.toString())
        return response["name"]
      }
    )
    return name
  }

  async getStickerNames(stickers_collection: Array<number>) {
    let sticker_names = {}
    for (let sid of stickers_collection){
      let name = await this.getStickerName(sid)
      sticker_names[sid] = name
    }
    return sticker_names
  }

  async editPerson(uid) {
    let person = this.people.find(person => person.uid == uid)
    let sticker_names = await this.getStickerNames(person.stickers.collection)
    let person_data = {
      is_new: false,
      uid: person.uid,
      surname: person.surname,
      lastname: person.lastname,
      vulgo: person.vulgo,
      cards: person.cards,
      stickers_collection: person.stickers.collection,
      stickers_selected: person.stickers.selected,
      sticker_names: sticker_names
    }
    this.openAccountModal(person_data)
  }

  async newPerson() {
    let person_data = {
      is_new: true,
      uid: 0,
      surname: "",
      lastname: "",
      vulgo: "",
      cards: [],
      stickers_collection: [0],
      stickers_selected: 0
    }
    this.openAccountModal(person_data)
  }

  async openAccountModal(data){
    const modal = await this.modalController.create({
      component: AccountModalPage,
      componentProps: data
    });
    await modal.present();
    modal.onDidDismiss().then(() => this.getPeople())
  }



}
