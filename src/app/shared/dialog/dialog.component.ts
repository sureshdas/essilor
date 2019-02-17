import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  type = '';

  // for search
  label1: any = 'Product Configuration';
  label2: any = 'Application';
  label3: any = 'Family';
  label4: any = 'Modality';

  selectedLabel1Value: any = 'option1';
  selectedLabel2Value: any = 'option1';
  selectedLabel3Value: any = 'option1';
  selectedLabel4Value: any = 'option1';

  // for filters page
  label: any;
  labelValue: any;
  action: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    // console.log('Dialog data', data);
    this.type = data.type;
    if (this.type === 'FILTER_PAGE') {
      this.label = data.label;
      this.labelValue = data.value;
      this.action = data.isCreate ? 'Add ' : 'Update ';
    }
  }

  ngOnInit() {
  }

}
