import { Component, OnInit } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  wifis = []

  ionViewDidEnter() {
    this.getWifis();
  }

  constructor(private http: HttpClient, private alertController: AlertController) { }

  ngOnInit() {
  }

  getWifis() {
    this.http.get(environment.baseUrl + 'wifis').toPromise().then((wifi) => { this.wifis = wifi['wifis'] })
  }

  newDay() {
    this.alertController.create({
      header: 'Neue Obig?',
      buttons: [
        {
          text: 'Abbreche',
          role: 'cancel',
        }, {
          text: 'Jo',
          handler: () => {
            this.http.delete(environment.baseUrl + 'people/new_day').toPromise().then()
          }
        }
      ]
    }).then((alert)=>alert.present())
  }


}
