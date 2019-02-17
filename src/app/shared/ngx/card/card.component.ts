import { Component, OnInit, Input } from '@angular/core';
import { SharedApiService } from '@app/shared/shared-api.service';
import { SharedService } from '@app/shared/shared.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() metaInfo: any;
  @Input() model: any;
  parameters: any = {
    'PREVIOUS_DATE': Date,
    'CURRENT_DATE': Date
  };
  displayValue: any;
  constructor(private sharedApi: SharedApiService, private sharedService: SharedService) { }

  ngOnInit() {
    if (this.metaInfo.reference_api) {
      const ref = this.metaInfo.reference_api[0];
      // let d = new Date();
      // this.parameters['CURRENT_DATE'] = this.sharedService.formatDate(new Date(d.setDate(d.getDate() + 1)));
      // const diff = 7;
      // this.parameters['PREVIOUS_DATE'] = this.sharedService.formatDate(new Date(d.setDate(d.getDate() - Number(diff))));
      this.parameters = this.sharedService.createDateObject();
      const params = this.sharedService.convertToParams(this.parameters, ref.parameters);
      this.sharedApi.ajaxRequestGet(ref.api, ref.page_activity, params)
        .subscribe((response: any) => {
          // console.log('card', response);
          this.displayValue = response.view_count;
        });
    }
  }
}
