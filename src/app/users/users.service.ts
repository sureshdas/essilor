import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SharedService } from '@app/shared/shared.service';

const routes = {
  getUsersMetaInfo: 'v1/components',
  user: 'v1/user',
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private sharedService: SharedService) { }

  toFormGroup(controls: any) {
    let obj = {};
    controls.forEach((control: any) => {
      obj[control.name] = '';
    });
    return obj;
  }

  getProductsMetaInfo(type: string) {
    let url = routes.getUsersMetaInfo;
    url = this.sharedService.generateQueryString(url, { component: type, activity_code: 'CMS10002' });

    return this.http.get(url, this.sharedService.generateHeader('USERS'))
      .pipe(map((response: any) => {
        console.log('users meta ', type, ' :', response);
        if (response.status === 1) {
          return response.data;
        }
      }));
  }

  addUser(data: any) {
    return this.http.post(routes.user, data, this.sharedService.generateHeader('USERS'))
      .pipe(map((response: any) => {
        console.log('add user :', response);
        if (response.status === 1) {
          return response.data;
        }
      }));
  }

  deleteUser(id: any, status: boolean) {
    return this.http.delete(`${routes.user}/${id}`, this.sharedService.generateHeader('USERS'))
      .pipe(map((response: any) => {
        console.log('delete user :', response);
        if (response.status === 1) {
          return response.data;
        }
      }));
  }
  updateUser(id: string, params: any) {
    return this.http.put(`${routes.user}/${id}`, params, this.sharedService.generateHeader('USERS'))
      .pipe(map((response: any) => {
        console.log('update user :', response);
        if (response.status === 1) {
          return response.data;
        }
      }));
  }
  getUserById(id: string) {
    return this.http.get(`${routes.user}/${id}`, this.sharedService.generateHeader('USERS'))
      .pipe(map((response: any) => {
        console.log('get user by id :', response);
        if (response.status === 1) {
          return response.data;
        }
      }));
  }
}
