import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RoleService } from 'src/app/services/role.service';
import { Roles } from 'src/models/roles';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAuthenticated = false;
  isAdmin = false;
  isProjectLead = false;

  constructor(private authService: AuthService, private roleService: RoleService, private router: Router) {}

  ngOnInit(): void {
    // Vérifie si l'utilisateur est connecté
    this.authService.isAuthenticated$.subscribe((status) => {
      this.isAuthenticated = status;
      this.isAdmin = this.roleService.hasRole(Roles.Admin);
      this.isProjectLead = this.roleService.hasRole(Roles.ProjectLead)
    });
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
