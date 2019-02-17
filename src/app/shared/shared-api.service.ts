import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SharedService } from '@app/shared/shared.service';

const routes = {
  componentMetaInfo: 'v1/components',
};
@Injectable({
  providedIn: 'root'
})
export class SharedApiService {

  constructor(private http: HttpClient, private sharedService: SharedService) { }

  // Takes in type of component (grid, tree)
  // page activity : ('COMPANIES', 'PRODUCTS')
  // returns the meta info for that component
  getComponentMetaInfo(type: string, pageActivity: string) {
    const activityCode = this.sharedService.extractUserPermissions(pageActivity);
    let url = routes.componentMetaInfo;
    url = this.sharedService.generateQueryString(url, { component: type, activity_code: activityCode });

    return this.http.get(url, this.sharedService.generateHeader(pageActivity))
      .pipe(map((response: any) => {
        // console.log(`${pageActivity} meta :`, response);
        if (response.status === 1) {
          return response.data;
        }
      }));
  }

  ajaxRequestGet(url: string, pageActivity: string, params: {}) {
    const activityCode = this.sharedService.extractUserPermissions(pageActivity);
    url = this.sharedService.generateQueryString(url, params);

    return this.http.get(url, this.sharedService.generateHeader(pageActivity))
      .pipe(map((response: any) => {
        // console.log(`${pageActivity} api request :`, response);
        if (response.status === 1) {
          return response.data;
        }
      }));
  }


  getDataForSearch(url: string, params: any = {}, pageActivity: string) {
    url = this.sharedService.generateQueryString(url, params);
    return this.http.get(url, this.sharedService.generateHeader(pageActivity))
      .pipe(
        map((response: any) => {
          // console.log(`search data :`, response);
          if (response.status === 1) {
            return response.data;
          }
        })
      );
  }

  getDataForList(url: string, params: any = {}) {
    return this.http.get(url)
      .pipe(
        map((response: any) => {
          console.log(`list data :`, response);
          if (response.status === 1) {
            return response.data;
          }
        }));
  }

  // used in regions => add company button
  postData(url: string, pageActivity: string, data: any) {
    return this.http.post(url, data, this.sharedService.generateHeader(pageActivity))
      .pipe(map((response: any) => {
        console.log(`post data :`, response);
        if (response.status === 1) {
          return response.data;
        }
      }));
  }
  // used in regions => update region button
  updateData(url: string, pageActivity: string, data: any) {
    return this.http.put(url, data, this.sharedService.generateHeader(pageActivity))
      .pipe(map((response: any) => {
        console.log(`put data :`, response);
        if (response.status === 1) {
          return response.data;
        }
      }));
  }
  deleteData(url: string, pageActivity: string) {
    return this.http.delete(url, this.sharedService.generateHeader(pageActivity))
      .pipe(map((response: any) => {
        // console.log(`delete data :`, response);
        if (response.status === 1) {
          return response.data;
        }
      }));
  }

}
