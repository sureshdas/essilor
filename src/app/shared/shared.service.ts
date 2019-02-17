import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DialogComponent } from '@app/shared/dialog/dialog.component';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { PreviewComponent } from '@app/shared/preview/preview.component';

@Injectable()
export class SharedService {
  sharedData = new BehaviorSubject('hi');
  command = this.sharedData.asObservable();
  constructor(private http: HttpClient, public snackBar: MatSnackBar, private dialog: MatDialog) { }

  // toaster message
  showMessage(message: string) {
    return this.snackBar.open(message, '', {
      duration: 2000,
      // horizontalPosition: 'end',
      // verticalPosition: 'top',
      panelClass: 'toaster'
    }).afterDismissed();
  }

  createDateObject(diff: number = 7) {
    const d = new Date();
    const parameters = {};
    parameters['CURRENT_DATE'] = this.formatDate(new Date(d.setDate(d.getDate() + 1)));
    parameters['PREVIOUS_DATE'] = this.formatDate(new Date(d.setDate(d.getDate() - Number(diff))));
    return parameters;
  }

  // input : date object
  // output : YYYY-MM-DD
  formatDate(d: any) {
    // console.log(d);
    const year = d.getFullYear();
    const month = d.getMonth() <= 9 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
    const day = d.getDate() <= 9 ? '0' + d.getDate() : d.getDate();
    return `${year}-${month}-${day}`;
  }
  formatIsoDate(d: any) {
    function getMonthName(m: any) {
      switch (m) {
        case '01':
          return 'Jan';
        case '02':
          return 'Feb';
        case '03':
          return 'Mar';
        case '04':
          return 'Apr';
        case '05':
          return 'May';
        case '06':
          return 'Jun';
        case '07':
          return 'Jul';
        case '08':
          return 'Aug';
        case '09':
          return 'Sep';
        case '10':
          return 'Oct';
        case '11':
          return 'Nov';
        case '12':
          return 'Dec';
      }
    }
    if (d) {
      d = d.split('T')[0].split('-');
      // console.log(d);
      return `${d[2]} ${getMonthName(d[1])} ${d[0]}`;
    }
    return '';
  }

  convertToParams(data: any, params: any = {}) {
    const obj = {};
    params.forEach((el: any) => {
      obj[el.key] = el.value_from ? data[el.value_from] : el.value;
    });
    return obj;
  }

  showDialog(data: any, height: string = 'auto', width: string = 'auto') {
    return this.dialog.open(DialogComponent, {
      width: width,
      height: height,
      data: data
    }).afterClosed();
  }

  previewMedia(data: any) {
    return this.dialog.open(PreviewComponent, {
      width: '90%',
      height: '90%',
      panelClass: 'preview-panel',
      data: data
    }).afterClosed();
  }


  /**
   * Finds the activity code.
   * @param {pageName} context The page name
   * @return {activityCode} The activity code for the page
   */
  extractUserPermissions(page: string): string {
    let code;
    const userPermissions = JSON.parse(localStorage.userInfo).permissions;
    for (let i = 0; i < userPermissions.length; i++) {
      if (userPermissions[i].name === page) {
        code = userPermissions[i].code;
        break;
      }
    }
    return code;
  }

  generateHeader(page: string) {
    const userId = localStorage.user_id;
    let code = this.extractUserPermissions(page);
    code = btoa(userId + '-piich-' + code);
    const httpOptions = {
      headers: new HttpHeaders({
        'x-activity-code': code
      })
    };
    // console.log(httpOptions);
    return httpOptions;
  }

  generateQueryString(url: string, params: any = {}) {
    const noOfProperties = Object.keys(params).length;
    let arr = [];
    let qs = '?';
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        if (params[key] !== undefined && params[key] !== '' && params[key] !== 0) {
          let pair;
          pair = `${key}="${params[key]}"`;
          arr.push(pair);
        }
      }
    }
    qs += arr.join('&');
    return url + qs;
  }

  // download options for select dropdown
  downloadOptions(api: string) {
    return this.http.get(api)
      .pipe(map((response: any) => {
        // console.log('select options :', response);
        // if (response.status === 1) {
        return response;
        // }
      }));
  }

  // return a object for a form
  toFormGroup(controls: any) {
    const obj = {};
    controls.forEach((control: any) => {
      if (control.type === 'array' || (control.type === 'select' && control.multi)) {
        obj[control.name] = [];
      } else if (control.type === 'group') {
        // if the key has to be created as an array of objects.
        // key = [{}]
        // the group_order_key property mentions the structures that will be present in the object.
        obj[control.name] = [];
      } else {
        obj[control.name] = '';
      }
    });
    return obj;
  }

  // implementing a new way to create the model.
  // this is for add-regions, and loops throught the layout object.
  toFormGroupReactive(layout: any) {
    let obj = {};
    layout.forEach((controls: any) => {
      controls.component.forEach((control: any) => {
        if (control.fieldId) {
          obj[control.fieldId] = '';
        }
      });
    });
    // controls.forEach((control: any) => {
    //   obj[control.name] = control.required ? new FormControl('', Validators.required) : new FormControl('');
    // });
    // console.log(obj);
    return obj;
  }

  // used for edit-region page
  convertDataForEditing(fields: any) {
    let obj = {};
    fields.forEach((el: any) => {
      obj[el.fieldId] = el.value;
    });
    return obj;
  }
  convertDataForUpdating(fields: any) {
    let result = [];
    for (let key in fields) {
      if (fields.hasOwnProperty(key)) {
        let obj = {};
        obj['field'] = key;
        obj['value'] = fields[key];
        result.push(obj);
      }
    }
    // console.log('update obj', result);
    return result;
  }

  sendSharedData(msg: any) {
    this.sharedData.next(msg);
  }


}
