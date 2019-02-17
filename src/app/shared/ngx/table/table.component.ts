import { Component, OnInit, Input } from '@angular/core';
import { SharedApiService } from '@app/shared/shared-api.service';
import { SharedService } from '@app/shared/shared.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() metaInfo: any;
  @Input() model: any;
  parameters: any = {
    'PREVIOUS_DATE': Date,
    'CURRENT_DATE': Date
  };
  data: any = [];
  constructor(private sharedApi: SharedApiService, private sharedService: SharedService) { }

  ngOnInit() {
    console.log('table', this.metaInfo);
    if (this.metaInfo.data.reference_api) {
      const ref = this.metaInfo.data.reference_api[0];
      // console.log('ref', ref);
      let d = new Date();
      this.parameters['CURRENT_DATE'] = this.sharedService.formatDate(new Date(d.setDate(d.getDate() + 1)));
      const diff = 7;
      this.parameters['PREVIOUS_DATE'] = this.sharedService.formatDate(new Date(d.setDate(d.getDate() - Number(diff))));

      const params = this.convertToParams(ref.parameters);
      this.sharedApi.ajaxRequestGet(ref.api, ref.page_activity, params)
        .subscribe((response: any) => {
          // console.log('table resp', response);
          this.data = response;
          // this.displayValue = response.view_count;
        });
    }
  }

  convertToParams(params: any = []) {
    const obj = {};
    params.forEach((el: any) => {
      obj[el.key] = el.value_from ? this.parameters[el.value_from] : el.value;
    });
    return obj;
  }
}
