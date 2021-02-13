import { environment } from './../../environments/environment';
import { CardModalPage } from './../card-modal/card-modal.page';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  quote = "Saletti zeme, suffed doch es Pör";
  author = "Pio-o-Mat v2.0"

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


  async buyPio() {
    const modal = await this.modalCtrl.create({
      component: CardModalPage,
      componentProps: {}
    });
    await modal.present();
    modal.onDidDismiss().then((return_data) => {
      console.log(return_data)
      if (return_data.data.found) {

        // card was found, get owner
        this.http.get(environment.baseUrl + 'people/by_card/' + return_data.data.card_uid).toPromise().then((person_data) => {
          // owner found, check balance
          if (person_data["balance"] >= environment.pioPrice) {
            // balance sufficient, subtract price, increment statistics
            person_data["balance"] -= environment.pioPrice;
            person_data["statistics"]++;
            // send updated person info
            this.http.put(environment.baseUrl + 'people/' + person_data["uid"], person_data).toPromise().then(() => {
              this.http.get(environment.baseUrl + 'success');
              this.http.get(environment.baseUrl + 'quote').toPromise().then((quote_data) => {
                this.quote = quote_data["quote"]
                this.author = quote_data["author"]
              })
              this.displayToast("<b>"+person_data["vulgo"]+"</b>: Het es Pör kauft. Kontostand: " + new Intl.NumberFormat('de-CH', { minimumFractionDigits: 2 }).format(person_data["balance"]/100) + " Fr.", "success");
            })
          }
          else {
            // balance was to low
            this.http.get(environment.baseUrl + 'failure')
            this.displayToast("Zwenig Geld", "danger");
          }
        }
        ).catch(() => {
          // owner not found
          this.http.get(environment.baseUrl + 'failure')
          this.displayToast("Die Charte ghört niemertem", "danger");
        })
      }
      else {
        // no card found
        this.http.get(environment.baseUrl + 'failure')
        this.displayToast("Kei Charte gfunde", "danger");
      }
    })


  }


}
