import { Routes } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
import { FeeComponent } from '../pages/fee/fee.component';
import { authGuard } from '../pages/authentication/auth.guard';
import { RBACComponent } from '../pages/rbac/rbac.component';

export const routes: Routes = [
{
  path: '',
  redirectTo: 'login',
  pathMatch: 'full'
},
 {
    path: 'login',
    component: LoginComponent},
  {
    path: 'fee',
    component:FeeComponent  ,
    canActivate: [authGuard]
  },
  {
    path: 'rbac',
    component:RBACComponent,
    canActivate: [authGuard]
  }

];
