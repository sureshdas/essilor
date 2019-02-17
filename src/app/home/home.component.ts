import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { QuoteService } from './quote.service';
import { Chart } from 'chart.js';
import { SharedService } from '@app/shared/shared.service';
import { SharedApiService } from '@app/shared/shared-api.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  chart: any;
  quote: string;
  isLoading = false;
  metaInfo: any;
  componentDb: any = {};
  dashboard: any;
  constructor(private sharedService: SharedService, private sharedApi: SharedApiService) { }

  ngOnInit() {
    this.getMetaInfo();
    // this.chart = new Chart('myChart', {
    //   // The type of chart we want to create
    //   type: 'line',

    //   // The data for our dataset
    //   data: {
    //     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    //     datasets: [{
    //       label: 'My First dataset',
    //       backgroundColor: 'rgb(255, 99, 132)',
    //       borderColor: 'rgb(255, 99, 132)',
    //       data: [0, 10, 5, 2, 20, 30, 45],
    //     }]
    //   },

    //   // Configuration options go here
    //   options: {}
    // });
  }
  getMetaInfo() {
    this.isLoading = true;
    this.sharedApi.getComponentMetaInfo('dashboard', 'DASHBOARD').subscribe((response: any) => {
      console.log('DASHBOARD', response);
      this.metaInfo = response;
      this.isLoading = false;
    });
  }
}
