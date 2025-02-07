import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task,TaskStatus } from 'src/models/task';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  newTask = { title: '', description: '', status: TaskStatus.Todo };

  constructor(private taskService: TaskService, private router: Router) {}

  addTask(): void {
      if (!this.newTask.title.trim()) {
          alert("Le nom de la tâche est requis !");
          return;
      }

      const task: Task = {
          id: uuidv4(),
          projectId: "project-id",
          title: this.newTask.title,
          description: this.newTask.description,
          status: this.newTask.status as TaskStatus,
          assignedTo: "",
          dueDate: new Date(),
          createdAt: new Date()
      };

      this.taskService.addTask(task);
      this.router.navigate(['/kanban']); // Redirection vers le Kanban après ajout
  }

  cancel(): void {
    this.router.navigate(['/kanban']);
  }
}
