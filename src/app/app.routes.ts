import { Routes } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
import { FeeComponent } from '../pages/fee/fee.component';
import { authGuard } from '../pages/authentication/auth.guard';
import { RBACComponent } from '../pages/rbac/rbac.component';
import { AdminPanelComponent } from '../pages/admin-panel/admin-panel.component';
import { RoleGuard } from '../pages/authentication/role.guard';
import { ManagementDashboardComponent } from '../pages/management-dashboard/management-dashboard.component';
import { RoleType } from '../pages/rbac/domain/role.model';

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
  component: RBACComponent,
  canActivate: [authGuard], // ensure only superadmin
  data: { roles: ['SUPER_ADMIN'] }
},
 {
    path: 'admin-panel',
    component: AdminPanelComponent,
    canActivate: [authGuard,  RoleGuard],
    data: { roles: [RoleType.SUPER_ADMIN] }
  },
  {
    path: 'management-dashboard',
    component: ManagementDashboardComponent,
    canActivate: [authGuard,RoleGuard],
    data: { roles: [RoleType.SUPER_ADMIN, RoleType.MANAGER] }
  }
];
