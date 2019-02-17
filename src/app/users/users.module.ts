import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { AddUserComponent } from './add-user/add-user.component';

// import { SlkGridModule, SlkSortModule, SlkTreeModule, SlkFilterModule } from 'ngx-sleek';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UsersRoutingModule,
    // SlkGridModule,
    // SlkSortModule,
    // SlkTreeModule,
    // SlkFilterModule,
  ],
  declarations: [UsersComponent, AddUserComponent]
})
export class UsersModule { }
