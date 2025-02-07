import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Roles } from 'src/models/roles';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private localStorageKey = 'currentUser';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  // Liste des utilisateurs fictifs avec différents rôles
  private users = [
    { username: 'admin', password: 'admin123', workspace: 'Acme Inc.', role: Roles.Admin },
    { username: 'lead', password: 'lead123', workspace: 'Tech Corp.', role: Roles.ProjectLead },
    { username: 'dev', password: 'dev123', workspace: 'Code Factory', role: Roles.Developer },
    { username: 'viewer', password: 'viewer123', workspace: 'Design Hub', role: Roles.Viewer }
  ];

  constructor() {}

  // Méthode de connexion
  login(username: string, password: string): boolean {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(user));
      this.isAuthenticatedSubject.next(true);
      return true;
    }
    return false;
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(this.localStorageKey) !== null;
  }

  logout(): void {
    localStorage.removeItem(this.localStorageKey);
    this.isAuthenticatedSubject.next(false);
  }

  getCurrentUser(): any {
    const user = localStorage.getItem(this.localStorageKey);
    return user ? JSON.parse(user) : null;
  }
}
