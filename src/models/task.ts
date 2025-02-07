export enum TaskStatus {
    Todo = 'Todo',
    InProgress = 'In Progress',
    Done = 'Done'
}
  

export interface Task {
    id: string;
    projectId: string;
    title: string;
    description: string;
    assignedTo: string; // Username du développeur assigné
    status: TaskStatus;
    dueDate: Date;
    createdAt: Date;
}
  