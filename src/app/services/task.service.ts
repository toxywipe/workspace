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

  // Récupérer les tâches d’un projet
  getTasksByProject(projectId: string): Task[] {
    return this.storageService.getItem<Task[]>(this.storageKey)?.filter(task => task.projectId === projectId) || [];
  }

  // Modifier une tâche
  updateTask(updatedTask: Task): void {
    const tasks = this.storageService.getItem<Task[]>(this.storageKey) || [];
    const index = tasks.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      tasks[index] = updatedTask;
      this.storageService.setItem(this.storageKey, tasks);
    }
  }

  getTasks(): Task[] {
    return this.storageService.getItem<Task[]>('tasks') || [];
  }

  getTaskById(taskId: string): Task | undefined {
    const tasks = this.getTasks();
    return tasks.find(task => task.id === taskId);
  }


  // Supprimer une tâche
  deleteTask(taskId: string): void {
    const tasks = this.storageService.getItem<Task[]>(this.storageKey)?.filter(task => task.id !== taskId) || [];
    this.storageService.setItem(this.storageKey, tasks);
  }
}
