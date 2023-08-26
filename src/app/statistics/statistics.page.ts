import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {

  @ViewChild('todayChart') todayChart;
  @ViewChild('foreverChart') foreverChart;

  todayBars: any;
  foreverBars: any;
  colorArray: any;
  totalPios = 0;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  ionViewDidEnter() {
    this.createTodayBarChart();
    this.createForeverBarChart();
    this.calculateTotalPios();
  }

  calculateTotalPios() {
    this.http.get(environment.baseUrl + 'people').toPromise().then((people => {
      people["people"].forEach(person => {
        if (person["uid"] != 0) // do not include master in statistics
        {
          this.totalPios += person["statistics"]
        }
      });
    }))
  }

  createTodayBarChart() {
    this.http.get(environment.baseUrl + 'people').toPromise().then((people => {

      let names = []
      let statistics = []

      people['people'].sort((first, second) => { return second['today'] - first['today'] }).forEach(person => {
        if (person["uid"] != 0) { // do not include master into statistics
          names.push(person['vulgo'])
          statistics.push(person['today'])
        }
      });

      this.todayBars = new Chart(this.todayChart.nativeElement, {
        type: 'bar',
        data: {
          labels: names,
          datasets: [{
            label: 'Pör hüt gesufft',
            data: statistics,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
    }))
  }

  createForeverBarChart() {
    this.http.get(environment.baseUrl + 'people').toPromise().then((people => {

      let names = []
      let statistics = []

      people['people'].sort((first, second) => { return second['statistics'] - first['statistics'] }).forEach(person => {
        if (person["uid"] != 0) { // do not include master into statistics
          names.push(person['vulgo'])
          statistics.push(person['statistics'])
        }
      });

      this.foreverBars = new Chart(this.foreverChart.nativeElement, {
        type: 'bar',
        data: {
          labels: names,
          datasets: [{
            label: 'Pör total gesufft',
            data: statistics,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }

        
      });
    }))


  }

}
