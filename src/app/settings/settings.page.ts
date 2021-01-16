import { Component, OnInit } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  getWifis() {
    this.http.get(environment.baseUrl + 'wifis').toPromise().then((wifi) => { this.wifis = wifi['wifis'] })
  }


}
