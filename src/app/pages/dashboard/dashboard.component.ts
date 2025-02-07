import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RoleService } from 'src/app/services/role.service';
import { Roles } from 'src/models/roles';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  workspace = '';
  userRole = '';
  isAdmin = false;
  isProjectLead = false;
  isDeveloper = false;
  isViewer = false;

  constructor(private authService: AuthService, private roleService: RoleService) {
    const user = this.authService.getCurrentUser();
    this.workspace = user ? user.workspace : '';
    this.userRole = user ? user.role : '';

    // Vérifie les rôles
    this.isAdmin = this.roleService.hasRole(Roles.Admin);
    this.isProjectLead = this.roleService.hasRole(Roles.ProjectLead);
    this.isDeveloper = this.roleService.hasRole(Roles.Developer);
    this.isViewer = this.roleService.hasRole(Roles.Viewer);
  }
}
