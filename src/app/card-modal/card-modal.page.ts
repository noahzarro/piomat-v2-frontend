import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.page.html',
  styleUrls: ['./card-modal.page.scss'],
})
export class CardModalPage implements OnInit {

  constructor(public modalCtrl: ModalController, private http: HttpClient) { }

  ngOnInit() {
    this.searchCard()
  }

  searchCard() {
    this.http.get(environment.baseUrl + 'rfuid').toPromise().then((data) => {
      console.log("found card");
      this.modalCtrl.dismiss({ found: true, card_uid: data["c_uid"] });
    }).catch(() => {
      console.log("trying again")
      this.searchCard()
    }
    )
  }

}
