import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task,TaskStatus } from 'src/models/task';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.css']
})
export class KanbanBoardComponent implements OnInit {
  tasks: Task[] = [];
  todoTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  doneTasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    // Exemple : Charger les tâches pour un projet spécifique (ID fictif "123")
    this.tasks = this.taskService.getTasksByProject('123');
    this.todoTasks = this.tasks.filter((task) => task.status === TaskStatus.Todo);
    this.inProgressTasks = this.tasks.filter((task) => task.status === TaskStatus.InProgress);
    this.doneTasks = this.tasks.filter((task) => task.status === TaskStatus.Done);
  }
}
