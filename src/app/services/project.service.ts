import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Project } from 'src/models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private readonly storageKey = 'projects';

  constructor(private storageService: StorageService) {}

  // Ajouter un nouveau projet
  addProject(project: Project): void {
    const projects = this.storageService.getItem<Project[]>(this.storageKey) || [];
    projects.push(project);
    this.storageService.setItem(this.storageKey, projects);
  }

  // Récupérer tous les projets
  getProjects(): Project[] {
    return this.storageService.getItem<Project[]>(this.storageKey) || [];
  }

  // Récupérer un projet par son ID
  getProjectById(projectId: string): Project | undefined {
    return this.getProjects().find(project => project.id === projectId);
  }

  // Supprimer un projet
  deleteProject(projectId: string): void {
    const projects = this.getProjects().filter(project => project.id !== projectId);
    this.storageService.setItem(this.storageKey, projects);
  }

  // Ajouter un membre à un projet
  addMemberToProject(projectId: string, username: string, role: string): void {
    const projects = this.getProjects();
    const project = projects.find(p => p.id === projectId);

    if (project) {
      // Vérifier que l'utilisateur n'est pas déjà dans le projet
      if (!project.members.some(m => m.username === username)) {
        project.members.push({ username, role });
        this.storageService.setItem(this.storageKey, projects);
      }
    }
  }

  // Récupérer les membres d'un projet
  getProjectMembers(projectId: string): { username: string; role: string }[] {
    const project = this.getProjectById(projectId);
    return project ? project.members : [];
  }

  // Supprimer un membre d’un projet
  removeMemberFromProject(projectId: string, username: string): void {
    const projects = this.getProjects();
    const project = projects.find(p => p.id === projectId);

    if (project) {
      project.members = project.members.filter(m => m.username !== username);
      this.storageService.setItem(this.storageKey, projects);
    }
  }

}
