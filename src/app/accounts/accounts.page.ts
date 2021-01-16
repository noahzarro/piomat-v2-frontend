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
    this.http.get(environment.baseUrl + 'people').toPromise().then((people) => { this.people = people['people'] })
  }

  async editPerson() {
    const modal = await this.modalController.create({
      component: AccountModalPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }


}
