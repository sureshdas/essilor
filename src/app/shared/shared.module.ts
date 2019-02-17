import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { LoaderComponent } from './loader/loader.component';
import { FormsModule } from '@angular/forms';

import { SharedService } from './shared.service';
import { DynamicLayoutComponent } from './dynamic-layout/dynamic-layout.component';
import { DynamicComponentComponent } from './dynamic-component/dynamic-component.component';
import { DialogComponent } from '@app/shared/dialog/dialog.component';
import { ClickOutsideDirective } from '@app/shared/click-outside.directive';
import { DropzoneDirective } from './dropzone.directive';
import { PreviewComponent } from '@app/shared/preview/preview.component';
import { PasswordFieldComponent } from './ngx/password-field/password-field.component';
import { CardComponent } from './ngx/card/card.component';
import { TableComponent } from './ngx/table/table.component';
import { ChartComponent } from './ngx/chart/chart.component';
@NgModule({
  imports: [
    FlexLayoutModule,
    MaterialModule,
    CommonModule,
    FormsModule
  ],
  declarations: [
    LoaderComponent,
    DynamicLayoutComponent,
    DynamicComponentComponent,
    DialogComponent,
    DynamicLayoutComponent,
    DynamicComponentComponent,
    ClickOutsideDirective,
    DropzoneDirective,
    PreviewComponent,
    PasswordFieldComponent,
    CardComponent,
    TableComponent,
    ChartComponent
  ],
  exports: [
    LoaderComponent,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    DynamicLayoutComponent,
    DynamicComponentComponent,
    ClickOutsideDirective,
    DropzoneDirective
  ],
  providers: [SharedService]
})
export class SharedModule { }
