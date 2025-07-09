import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdmindashboardComponent } from './components/dashboard/admindashboard.component';
import { AuthGuard } from '../services/guards/auth.guard';
import { ManageComponent } from './components/manage/manage.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { PostCategoryComponent } from './components/post-category/post-category.component';
import { PostProductComponent } from './components/post-product/post-product.component';
import { UpdateproductComponent } from './components/updateproduct/updateproduct.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  {path: 'dashboard', component: AdmindashboardComponent, canActivate: [AuthGuard]},
  {path:'manage', component: ManageComponent},
  {path: 'category', component: PostCategoryComponent},
  {path:'analytics', component: AnalyticsComponent},
  {path: 'product', component:PostProductComponent},
  {path:'product/:productId', component:UpdateproductComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
