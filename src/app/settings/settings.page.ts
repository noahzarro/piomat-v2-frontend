import { Component, OnInit } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  wifis = []
  new_ssid = ""
  new_password = ""

  ionViewDidEnter() {
    this.getWifis();
  }

  constructor(private http: HttpClient, private alertController: AlertController, private toastController: ToastController) { }

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

  getWifis() {
    this.http.get(environment.baseUrl + 'wifis').toPromise().then((wifi) => { this.wifis = wifi['wifis'] })
  }

  deleteWifi(ssid) {
    this.alertController.create({
      header: 'Würklich lösche?',
      buttons: [
        {
          text: 'Abbreche',
          role: 'cancel',
        }, {
          text: 'Jo',
          handler: () => {
            this.wifis.splice(this.wifis.findIndex(cur_wifi => cur_wifi["ssid"] == ssid))
            this.http.delete(environment.baseUrl + 'wifi/' + ssid).toPromise()
            this.displayToast("Wifi isch glöscht worde", "danger")
          }
        }
      ]
    }).then((alert)=>alert.present())
  }

  addWifi(){
    const new_wifi_dict = {"ssid": this.new_ssid, "password": this.new_password}
    this.http.post(environment.baseUrl + 'wifi', new_wifi_dict).toPromise().then(res =>{
      console.log(res)
      if (res["update"] == true) {
        this.displayToast("Wifi isch updated worde", "success")
      }
      else{
        this.displayToast("Wifi isch hinzuegfüegt worde", "success")
        this.wifis.push(new_wifi_dict)
      }
    })
  }

  shutdown() {
    this.backup()
    this.http.get(environment.baseUrl + 'shutdown').toPromise().then(
      () =>
      this.displayToast("Abefahre in 10s", "success")
    )
  }

  reboot() {
    this.backup()
    this.http.get(environment.baseUrl + 'reboot').toPromise().then(
      () =>
      this.displayToast("Neustart in 10s", "success")
    )

  }

  backup() {
    this.http.get(environment.baseUrl + 'backup').toPromise().then(
      () =>
      this.displayToast("Backup isch erstellt worde!", "success")
    ).catch(
      () =>
      this.displayToast("Backup het nöd klappet. Internet verbindig prüefe!", "danger")
    )
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
            this.http.delete(environment.baseUrl + 'people/new_day').toPromise().then(
              () =>
              this.displayToast("Neue Obig isch gstartet. Zum wohl", "success")
            )
          }
        }
      ]
    }).then((alert)=>alert.present())
  }


}
