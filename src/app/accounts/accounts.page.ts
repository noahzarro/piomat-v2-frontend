import { Component, OnInit } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  getPeople() {
    this.http.get(environment.baseUrl + 'people').toPromise().then((people) => { this.people = people['people'] })
  }


}
