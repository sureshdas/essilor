import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SharedService } from '@app/shared/shared.service';
import { thisExpression } from 'babel-types';

const routes = {
  getProductsMetaInfo: 'v1/components',
  reorder: 'v1/products/updateOrder',
};

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient, private sharedService: SharedService) { }

  getProductsMetaInfo(type: string) {
    let url = routes.getProductsMetaInfo;
    url = this.sharedService.generateQueryString(url, { component: type, activity_code: 'CMS10001' });

    return this.http.get(url, this.sharedService.generateHeader('PRODUCTS'))
      .pipe(map((response: any) => {
        console.log('products meta ', type, ' :', response);
        if (response.status === 1) {
          return response.data;
        }
      }));
  }

  getProducts(url: string, params: any = {}) {
    // url = this.sharedService.generateQueryString(url, params);

    return this.http.get(url, this.sharedService.generateHeader('PRODUCTS'))
      .pipe(map((response: any) => {
        // console.log('get all products :', response);
        if (response.status === 1) {
          return response.data;
        }
      }));
  }

  getProductsTree(url: any, search: string = '') {
    url = this.sharedService.generateQueryString(url, { search: search });
    return this.http.get(url, this.sharedService.generateHeader('PRODUCTS'))
      .pipe(map((response: any) => {
        console.log('get all products tree :', response);
        if (response.status === 1) {
          return response.data;
        }
      }));
  }

  treeReorder(data: any) {
    return this.http.post(routes.reorder, data, this.sharedService.generateHeader('PRODUCTS'))
      .pipe(map((response: any) => {
        console.log('reorder structure :', response);
        if (response.status === 1) {
          return response.data;
        }
      }));
  }
}
