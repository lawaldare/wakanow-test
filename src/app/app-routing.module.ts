import { UserDetailsComponent } from './user-details/user-details.component';
import { AuthGuardGuard } from './auth-guard.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'auth' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardGuard] },
  { path: 'user/:id', component: UserDetailsComponent, canActivate: [AuthGuardGuard] },
  { path: '**', pathMatch: 'full', redirectTo: 'auth' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
