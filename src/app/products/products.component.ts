import { Component, OnInit, Injectable, ViewChild } from '@angular/core';
// import { SlkGridDataSource, NestedTreeControl, SlkGridFilterDirective } from 'ngx-sleek';
import { ProductsService } from '@app/products/products.service';
import { BehaviorSubject, of as observableOf } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  loading = true;
  searchTerm: any;
  dataSource: any;
  displayedColumns: Array<string> = [];
  metaInfo: any;
  tableOrder: any = [];
  totalLength: any = 500;
  primaryKey: string;
  constructor(
    private productsService: ProductsService,
  ) { }

  ngOnInit() {
    // this.dataSource.data = this.data;
    this.getProductsMeta();
  }

  getProductsMeta() {
    this.productsService.getProductsMetaInfo('grid')
      .subscribe((response: any) => {
        console.log('products meta ::', response);
        this.metaInfo = response;
        this.tableOrder = this.metaInfo.structure;
        this.metaInfo.structure.forEach((item: any) => {
          this.displayedColumns.push(item.fieldId);
          if (item.primaryKey) {
            this.primaryKey = item;
          }
        });
        this.displayedColumns.push('actions');
        this.getAllProducts(this.metaInfo.api);
      });
  }

  getAllProducts(
    url: string,
    search: string = '',
    sort: string = '',
    order_by: number = 0,
    offset: number = 0
  ) {
    const limit = 20;
    offset = offset * limit;

    this.productsService.getProducts(
      url,
      { search: search, sort: sort, order_by: order_by, offset: offset, limit: limit }
    )
      .subscribe((response: any) => {
        console.log('get all products:', response);
        response = this.formatData(response);
        if (offset > 0) {
          // this.dataSource.data.push(response);
          const temp = this.dataSource.data;
          this.dataSource = temp.concat(response);
        } else {
          this.dataSource = response;
        }
        // console.log(response);
        this.loading = false;
      });
  }

  filterSearch(input: any) {
    if (input.length > 0) {
      // console.log(input);
      this.getAllProducts(this.metaInfo.api, input);
    } else {
      this.getAllProducts(this.metaInfo.api);
    }
  }

  formatData(res: any) {
    let data = [];
    let obj = {};
    const primary = res.primary_data;
    const secondary = res.secondary_data;

    for (let i = 0; i < primary.length; i++) {
      for (let j = 0; j < secondary.length; j++) {
        obj = {};
        if (primary[i].children.indexOf(secondary[j]._id) > -1) {
          obj[this.primaryKey['fieldId']] = primary[i][this.primaryKey['fieldId']];
          obj['_id'] = primary[i]['_id'];
          for (let x = 0; x < this.tableOrder.length; x++) {
            if (!this.tableOrder[x]['primaryKey']) {
              obj[this.tableOrder[x]['fieldId']] = secondary[j]['fields'][this.tableOrder[x]['extractKey']];
              // obj[this.tableOrder[x]['fieldId']] = this.tableOrder[x]['inFields'] ? secondary[j]['fields'][this.tableOrder[x]['extractKey']] : secondary[j][this.tableOrder[x]['extractKey']];
            }
          }
          data.push(obj);
        }
      }
    }
    console.log('data ::', data);
    return data;
  }

  // sortProduct($event: any) {
  //   // console.log($event);
  //   let sort = '';
  //   for (let i = 0; i <= this.tableOrder.length; i++) {
  //     if (this.tableOrder[i].name === $event.active) {
  //       sort = this.tableOrder[i].reference_id;
  //       break;
  //     }
  //   }
  //   const orderBy = $event.direction === 'asc' ? 1 : $event.direction === 'desc' ? -1 : 0;
  //   // console.log(sort, orderBy);
  //   this.getAllProducts(this.metaInfo.api, '', sort, orderBy);
  // }

  // reorder($event: any) {
  //   console.log('reorder', $event);
  //   const key = Object.keys($event[0])[0];
  //   console.log('key', key);
  //   $event = $event.map((el: any, ind: any) => {
  //     return {
  //       id: el[key].id,
  //       order: ind
  //     };
  //   });
  //   console.log('reorderedddd', $event);
  //   this.productsService.treeReorder($event)
  //     .subscribe((response: any) => { });
  // }

  // scrolled($event: any) {
  //   console.log($event);
  //   const offset = $event.pageIndex;
  //   this.getAllProducts(
  //     this.metaInfo.api, '', '', 0, offset
  //   );
  // }
}
