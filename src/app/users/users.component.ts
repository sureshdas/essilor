import { Component, OnInit } from '@angular/core';
import { SharedApiService } from '@app/shared/shared-api.service';
// import { SlkGridDataSource, NestedTreeControl, SlkGridFilterDirective } from 'ngx-sleek';
import { UsersService } from '@app/users/users.service';
import { SharedService } from '@app/shared/shared.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  // dataSourceTree: any;
  loading = false;
  searchTerm: any;
  // dataSource = new SlkGridDataSource();
  dataSource: any = [];
  displayedColumns: Array<string> = [];
  metaInfo: any;
  totalLength: any = 500;
  tableOrder: any[];
  constructor(
    private sharedApi: SharedApiService,
    private sharedService: SharedService,
    private userService: UsersService
  ) { }

  ngOnInit() {
    this.componentMetaInfo();
  }

  componentMetaInfo() {
    this.sharedApi.getComponentMetaInfo('grid', 'USERS')
      .subscribe((response: any) => {
        this.displayedColumns = [];
        this.metaInfo = response;
        this.tableOrder = response.structure;
        this.metaInfo.structure.forEach((item: any) => {
          this.displayedColumns.push(item.reference_name);
        });
        this.displayedColumns.push('actions');
        this.componentApi(response.api);
      });
  }

  componentApi(
    url: string,
    search: string = '',
    sort: string = '',
    order_by: number = 0,
    offset: number = 0) {
    const limit = 20;
    offset = offset * limit;
    const activityName = this.metaInfo.activityName;
    this.sharedApi.ajaxRequestGet(
      url,
      activityName, { search: search, sort: sort, order_by: order_by, offset: offset, limit: limit }
    )
      .subscribe((response: any) => {
        // response = response.map((el: any) => {
        //   return {
        //     roles: el.roles.join(', '),
        //     companies: el.companies.join(', '),
        //     createdAt: el.createdAt.split('T')[0],
        //     deleted: el.deleted ? 'inactive' : 'active',
        //     firstName: el.firstName,
        //     lastName: el.lastName,
        //     mobileNo: el.mobileNo,
        //     _id: el._id,
        //   }
        // });

        response.forEach((el: any) => {
          el['lastUsed'] = this.sharedService.formatIsoDate(el['lastUsed']);
          el['createdAt'] = this.sharedService.formatIsoDate(el['createdAt']);
        });
        if (offset > 0) {
          const temp = this.dataSource;
          this.dataSource = temp.concat(response);
        } else {
          this.dataSource = response;
        }
      });
  }

  deleteUser(id: string, status: any) {
    console.log('delete user', status);
    status = status === 'active' ? true : false;
    this.userService.deleteUser(id, status)
      .subscribe((response: any) => {
        this.componentMetaInfo();
      });
  }

  filterSearch(input: any) {
    if (input.length > 0) {
      // console.log(input);
      this.componentApi(this.metaInfo.api, input);
    } else {
      this.componentApi(this.metaInfo.api);
    }
  }

  sortTable($event: any) {
    console.log($event);
    let sort = $event.active;
    // for (let i = 0; i <= this.tableOrder.length; i++) {
    //   if (this.tableOrder[i].name === $event.active) {
    //     sort = this.tableOrder[i].reference_id;
    //     break;
    //   }
    // }
    const orderBy = $event.direction === 'asc' ? 1 : $event.direction === 'desc' ? -1 : 0;
    // console.log(sort, orderBy);
    this.componentApi(this.metaInfo.api, '', sort, orderBy);
  }

  scrolled($event: any) {
    console.log($event);
    const offset = $event.pageIndex;
    this.componentApi(
      this.metaInfo.api, '', '', 0, offset
    );
  }
}
