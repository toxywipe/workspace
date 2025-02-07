import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  
  constructor() {}

  // Sauvegarde une valeur dans localStorage
  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Récupère une valeur depuis localStorage
  getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) as T : null;
  }

  // Supprime un élément du localStorage
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Vérifie si une clé existe dans localStorage
  exists(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }
}
