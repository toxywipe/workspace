import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Task, TaskStatus } from 'src/models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly storageKey = 'tasks';

  constructor(private storageService: StorageService) {}

  // Ajouter une tâche
  addTask(task: Task): void {
    const tasks = this.storageService.getItem<Task[]>(this.storageKey) || [];
    tasks.push(task);
    this.storageService.setItem(this.storageKey, tasks);
  }

  // Récupérer toutes les tâches d'un projet
  getTasksByProject(projectId: string): Task[] {
    return this.storageService.getItem<Task[]>(this.storageKey)?.filter(task => task.projectId === projectId) || [];
  }

  // Mettre à jour le statut d'une tâche
  updateTaskStatus(taskId: string, newStatus: TaskStatus): void {
    const tasks = this.storageService.getItem<Task[]>(this.storageKey) || [];
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      task.status = newStatus;
      this.storageService.setItem(this.storageKey, tasks);
    }
  }

  // Supprimer une tâche
  deleteTask(taskId: string): void {
    const tasks = this.storageService.getItem<Task[]>(this.storageKey)?.filter(task => task.id !== taskId) || [];
    this.storageService.setItem(this.storageKey, tasks);
  }
}
