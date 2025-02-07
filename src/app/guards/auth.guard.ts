import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { RoleService } from '../services/role.service';
import { Roles } from 'src/models/roles';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private roleService: RoleService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['role'] as Roles;
    if (this.authService.isAuthenticated()) {
      if (expectedRole && !this.roleService.hasRole(expectedRole)) {
        this.router.navigate(['/dashboard']); // Redirige si rôle incorrect
        return false;
      }
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
