import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private localStorageKey = 'currentUser';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isAuthenticated());

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {}

  login(username: string, password: string): boolean {
    const mockUser = { username: 'admin', password: '123456' };

    if (username === mockUser.username && password === mockUser.password) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(mockUser));
      this.isAuthenticatedSubject.next(true); // Mise à jour de l'état
      return true;
    }

    return false;
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(this.localStorageKey) !== null;
  }

  logout(): void {
    localStorage.removeItem(this.localStorageKey);
    this.isAuthenticatedSubject.next(false); // Mise à jour de l'état
  }

  getCurrentUser(): any {
    const user = localStorage.getItem(this.localStorageKey);
    return user ? JSON.parse(user) : null;
  }
}
