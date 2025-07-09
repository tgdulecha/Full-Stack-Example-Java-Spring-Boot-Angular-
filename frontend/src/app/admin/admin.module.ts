import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PostCategoryComponent } from './components/post-category/post-category.component';
import { PostProductComponent } from './components/post-product/post-product.component';
import { AdmindashboardComponent } from './components/dashboard/admindashboard.component';
import { UpdateproductComponent } from './components/updateproduct/updateproduct.component';


@NgModule({
  declarations: [
    AdminComponent,
    PostCategoryComponent,
    PostProductComponent,
    AdmindashboardComponent,
    UpdateproductComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AdminModule { }
