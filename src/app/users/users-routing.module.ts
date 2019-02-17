import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Route, extract } from '@app/core';
import { UsersComponent } from './users.component';
import { AddUserComponent } from '@app/users/add-user/add-user.component';

const routes: Routes = [
  { path: '', component: UsersComponent, data: { title: extract('Essilor') } },
  { path: 'add', component: AddUserComponent, data: { title: extract('Essilor') } },
  { path: 'edit/:id', component: AddUserComponent, data: { title: extract('Essilor') } },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
