import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from '../services/guards/auth.guard';
import { TrackComponent } from './components/track/track.component';

const routes: Routes = [{ path: '', component: UsersComponent },
   {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'track', component:TrackComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
