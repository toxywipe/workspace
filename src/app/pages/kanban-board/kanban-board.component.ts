import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Router } from '@angular/router';
import { Task,TaskStatus } from 'src/models/task';
import { v4 as uuidv4 } from 'uuid';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.css']
})
export class KanbanBoardComponent implements OnInit {
  tasks: { [key in TaskStatus]: Task[] } = {
    Todo: [],
    "In Progress": [],
    Done: []
  };

  newTask = {
    title: '',
    description: '',
    status: 'Todo' as TaskStatus
  };
  
  TaskStatus = TaskStatus; // Expose l'énumération pour l'utiliser dans le HTML


  constructor(private router: Router, private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  navigateToAddTask(): void {
    this.router.navigate(['/add-task']);
  }

  navigateToEditTask(taskId: string): void {
    this.router.navigate(['/edit-task', taskId]);
}

  // Charger les tâches et les trier dans les colonnes
  loadTasks(): void {
    const allTasks = this.taskService.getTasksByProject("project-id");
    this.tasks = {
      Todo: allTasks.filter(t => t.status === TaskStatus.Todo),
      "In Progress": allTasks.filter(t => t.status === TaskStatus.InProgress),
      Done: allTasks.filter(t => t.status === TaskStatus.Done)
    };
  }

  addTask(status: TaskStatus): void {
    if (!this.newTask.title.trim()) {
        alert("Le nom de la tâche est requis !");
        return;
    }

    const task: Task = {
        id: uuidv4(),
        projectId: "project-id",
        title: this.newTask.title,
        description: "",
        status: status,
        assignedTo: "",
        dueDate: new Date(),
        createdAt: new Date()
    };

    this.taskService.addTask(task);
    this.loadTasks();

    // Réinitialiser le champ d'ajout
    this.newTask.title = '';
  }



  // Supprimer une tâche
  deleteTask(taskId: string): void {
    if (confirm("Voulez-vous vraiment supprimer cette tâche ?")) {
      this.taskService.deleteTask(taskId);
      this.loadTasks();
    }
  }

  drop(event: CdkDragDrop<Task[]>, newStatus: TaskStatus): void {
    if (event.previousContainer === event.container) {
        // Réorganiser dans la même colonne
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
        // Déplacer vers une autre colonne
        const task = event.previousContainer.data[event.previousIndex];
        task.status = newStatus;

        transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex
        );

        // Mettre à jour la tâche dans le stockage
        this.taskService.updateTask(task);
    }

    // Rafraîchir la liste des tâches après déplacement
    this.loadTasks();
}
}
