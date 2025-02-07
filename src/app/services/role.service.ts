import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Roles } from 'src/models/roles';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(private authService: AuthService) {}

  // Vérifie si l'utilisateur a un rôle spécifique
  hasRole(role: Roles): boolean {
    const user = this.authService.getCurrentUser();
    return user && user.role === role;
  }

  // Vérifie si l'utilisateur a l'un des rôles spécifiés
  hasAnyRole(roles: Roles[]): boolean {
    const user = this.authService.getCurrentUser();
    return user && roles.includes(user.role);
  }
}
