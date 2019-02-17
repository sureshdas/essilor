import { Component, OnInit } from '@angular/core';
import { ProductsService } from '@app/products/products.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '@app/shared/shared.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  pageTitle = 'Add';
  isEdit = false;
  id: string;
  loading = false;
  metaInfo: any;
  componentDb: any = {};
  product: any = {};
  constructor(
    private productService: ProductsService,
    private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.getMetaData();
    // console.log('route', this.route);
    if (this.router.url !== '/products/add') {
      this.isEdit = true;
      this.pageTitle = 'Edit';
      this.id = this.route.snapshot.params.id;
    }
  }

  getProductById(id: string) {
    // this.productService.getUserById(id)
    //   .subscribe((response: any) => {
    //     this.product = response;
    // if (this.isEdit) { // load the selected regions & companies
    //   this.dsValues = this.product[this.groupDS.key];
    //   // preselect the 1st region & company object
    //   this.groupDS.groupMemberNames.forEach((name: any) => {
    //     this.product[name] = this.dsValues[0][name];
    //   });
    // }
    // });
  }

  getMetaData() {
    this.productService.getProductsMetaInfo('form')
      .subscribe((response: any) => {
        this.metaInfo = response;
        if (this.metaInfo.multi_structure) {
          this.product = this.sharedService.toFormGroupReactive(response.structure[0]);
        }
        // console.log('controls :', response.structure);
        if (this.isEdit) {
          // this.id = '5b5f09913097cc3a84dc13bb';
          // this.getProductById(this.id);
        }
      });
  }

  addProduct() {
    // this.product[this.groupDS.key] = this.dsValues;
    // this.productService.addUser(this.product)
    //   .subscribe((response: any) => {
    //     this.router.navigate(['users']);
    //   });
  }

  updateProduct() {
    // this.product[this.groupDS.key] = this.dsValues;
    // this.productService.updateUser(this.id, this.product)
    //   .subscribe((response: any) => {
    //     this.router.navigate(['users']);
    //   });
  }

  tabChange($event:any) {
    console.log($event);
  }
}
