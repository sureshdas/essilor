import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
import { SharedApiService } from '@app/shared/shared-api.service';
import { SharedService } from '@app/shared/shared.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, AfterViewInit {
  @Input() metaInfo: any;
  @Input() model: any;
  chart: any;
  chartId: any;
  parameters: any = {
    'PREVIOUS_DATE': Date,
    'CURRENT_DATE': Date
  };

  constructor(private sharedApi: SharedApiService, private sharedService: SharedService) { }
  ngOnInit() {
    let rand: any = Math.random() * 1000;
    rand = parseInt(rand, 10);
    this.chartId = 'chart' + rand;
  }

  ngAfterViewInit() {
    console.log('chart', this.metaInfo);
    const type = this.metaInfo.data.chart_type;

    const ref = this.metaInfo.data.reference_api[0];
    this.parameters = this.sharedService.createDateObject();
    const params = this.sharedService.convertToParams(this.parameters, ref.parameters);

    this.sharedApi.ajaxRequestGet(ref.api, ref.page_activity, params)
      .subscribe((response: any) => {
        // console.log('chart resp ::', response);
        let chartData = {};
        const keys = [];

        const DS = this.createDS(this.metaInfo.data.y_axis.legend.length);
        const values = DS.values;
        const dataSet = DS.datasets;
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            keys.push(key);
            if (this.metaInfo.data.y_axis.multiple_legend) {
              response[key].forEach((val: any, index: any) => {
                values[index].push(val);
              });
            } else {
              values.push(response[key]);
            }
          }
        }

        const yAxisRef = this.metaInfo.data.y_axis;

        if (this.metaInfo.data.y_axis.multiple_legend) {
          this.metaInfo.data.y_axis.legend.forEach((el: any, index: any) => {
            dataSet[index]['label'] = yAxisRef.legend[index];
            dataSet[index]['backgroundColor'] = yAxisRef.color[index];
            dataSet[index]['borderColor'] = yAxisRef.color[index];
            dataSet[index]['data'] = values[index];
          });
        } else {
          dataSet[0]['label'] = yAxisRef.legend;
          dataSet[0]['backgroundColor'] = yAxisRef.color;
          dataSet[0]['borderColor'] = yAxisRef.color;
          dataSet[0]['data'] = values;
        }
        // console.log('values ...', values);
        // console.log('datasets ...', dataSet);

        // const set2 = {
        //   label: 'lkjklj',
        //   backgroundColor: 'rgb(255, 99, 132)',
        //   borderColor: 'rgb(255, 99, 132)',
        //   data: [0, 34, 35, 25, 26, 3, 5],
        // };

        this.chart = new Chart(this.chartId, {
          // The type of chart we want to create
          type: type,
          // type: 'bar',
          // The data for our dataset
          data: {
            // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            labels: keys,
            datasets: [...dataSet]
          },
          // Configuration options go here
          options: {
          }
        });
      });
  }

  createDS(length: any) {
    const values: any = [];
    const datasets = [];
    if (length > 1) {
      for (let i = 0; i < length; i++) {
        values.push([]);
        datasets.push({});
      }
    } else {
      datasets.push({});
    }
    return { values: values, datasets: datasets };
  }
}
