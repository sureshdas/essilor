import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductsService } from '@app/products/products.service';

// import { SlkGridModule, SlkSortModule, SlkTreeModule, SlkFilterModule } from 'ngx-sleek';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProductsRoutingModule,
    // SlkGridModule,
    // SlkSortModule,
    // SlkTreeModule,
    // SlkFilterModule,
  ],
  declarations: [ProductsComponent, AddProductComponent],
  providers: [
    ProductsService
  ]
})
export class ProductsModule { }
