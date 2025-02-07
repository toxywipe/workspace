import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task, TaskStatus } from 'src/models/task';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  task: Task = { id: '', projectId: '', title: '', description: '', status: '' as TaskStatus , assignedTo: '', dueDate: new Date(), createdAt: new Date() };

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (taskId) {
      const foundTask = this.taskService.getTaskById(taskId);
      if (foundTask) {
          this.task = foundTask;
      } else {
          alert("Tâche introuvable !");
          this.router.navigate(['/kanban']);
      }
    }
  }

  updateTask(): void {
    if (!this.task) return;

    this.taskService.updateTask(this.task);
    this.router.navigate(['/kanban']);
  }

  cancel(): void {
    this.router.navigate(['/kanban']);
  }
}