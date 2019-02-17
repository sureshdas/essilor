import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-dynamic-layout',
  templateUrl: './dynamic-layout.component.html',
  styleUrls: ['./dynamic-layout.component.scss']
})
export class DynamicLayoutComponent implements OnInit, AfterViewInit {
  @Input() layoutMeta: any;
  @Input() dataModel: any;
  @Input() componentDb: any;
  layout: string;

  constructor() { }

  ngOnInit() {
    console.log(this.layoutMeta);
  }
  ngAfterViewInit() { }
  getLayoutType() {
    this.layout = this.layoutMeta.layout_type ? this.layoutMeta.layout_type : 'row';
  }
  getFlex(position: any) {
    // switch (position) {
    //   case 'left_top':
    //   case 'left_bottom':
    //   case 'right_top':
    //     return '50%';

    //   case 'top':
    //   case 'bottom':
    //     return '100%';
    // }
    return this.layoutMeta.layout_type === 'column' ? '100%' : '50%';
  }

  // how to split the flex into parts.
  getFlexSize(arr: any) {
    const count = (100 / arr.length);
    // console.log('flex size ::', count);
    return `1 1 ${count}%`;
  }
}
