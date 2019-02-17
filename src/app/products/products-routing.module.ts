import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Route, extract } from '@app/core';
import { ProductsComponent } from './products.component';
import { AddProductComponent } from './add-product/add-product.component';

const routes: Routes = [
  { path: '', component: ProductsComponent, data: { title: extract('Essilor') } },
  { path: 'add', component: AddProductComponent, data: { title: extract('Essilor') } },
  { path: 'edit/:id', component: AddProductComponent, data: { title: extract('Essilor') } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
