import { Component, OnInit } from '@angular/core';
import { UsersService } from '@app/users/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '@app/shared/shared.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  pageTitle = 'Add';
  isEdit = false;
  id: string;
  loading = false;
  metaInfo: any;
  componentDb: any = {};
  user: any = {};
  // groupDS: any = {};
  // dsValues: any = [];

  constructor(
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.getUsersMeta();
    // console.log('route', this.route);
    if (this.router.url !== '/users/add') {
      this.isEdit = true;
      this.pageTitle = 'Edit';
      this.id = this.route.snapshot.params.id;
    }
  }

  getUserById(id: string) {
    this.usersService.getUserById(id)
      .subscribe((response: any) => {
        this.user = response;
        // if (this.isEdit) { // load the selected regions & companies
        //   this.dsValues = this.user[this.groupDS.key];
        //   // preselect the 1st region & company object
        //   this.groupDS.groupMemberNames.forEach((name: any) => {
        //     this.user[name] = this.dsValues[0][name];
        //   });
        // }
      });
  }

  getUsersMeta() {
    this.usersService.getProductsMetaInfo('form')
      .subscribe((response: any) => {
        this.metaInfo = response;
        // console.log('controls :', response.structure);
        this.user = this.sharedService.toFormGroupReactive(response.structure);
        if (this.isEdit) {
          // this.id = '5b5f09913097cc3a84dc13bb';
          this.getUserById(this.id);
        }
      });
  }

  addUser() {
    // this.user[this.groupDS.key] = this.dsValues;
    this.usersService.addUser(this.user)
      .subscribe((response: any) => {
        this.router.navigate(['users']);
      });
  }

  updateUser() {
    // this.user[this.groupDS.key] = this.dsValues;
    this.usersService.updateUser(this.id, this.user)
      .subscribe((response: any) => {
        this.router.navigate(['users']);
      });
  }
}
