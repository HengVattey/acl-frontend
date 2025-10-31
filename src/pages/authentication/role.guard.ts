import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { RoleType } from "../rbac/domain/role.model";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRoles = route.data['roles'] as RoleType[];

    if (this.authService.hasRole(requiredRoles)) {
      console.log('RoleGuard: Access granted based on roles', requiredRoles);
      return true;
    }

    this.router.navigate(['/error']);
    return false;
  }
}