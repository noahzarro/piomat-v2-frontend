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

  @ViewChild('barChart') barChart;

  bars: any;
  colorArray: any;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  ionViewDidEnter() {
    this.createBarChart();
  }

  createBarChart() {
    this.http.get(environment.baseUrl + 'people').toPromise().then((people => {

      let names = []
      let statistics = []

      people['people'].sort((first, second) => { return second['statistics'] - first['statistics'] }).forEach(person => {
        names.push(person['vulgo'])
        statistics.push(person['statistics'])
      });

      this.bars = new Chart(this.barChart.nativeElement, {
        type: 'bar',
        data: {
          labels: names,
          datasets: [{
            label: 'Pör gesufft',
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
