import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages//home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { Roles } from 'src/models/roles';
import { AdminComponent } from './pages/admin/admin.component';
import { ProjectManagerComponent } from './pages/project-manager/project-manager.component';
import { KanbanBoardComponent } from './pages/kanban-board/kanban-board.component';
import { AddTaskComponent } from './pages/add-task/add-task.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { role: Roles.Admin } },
  { path: 'projects', component: ProjectManagerComponent, canActivate: [AuthGuard] },
  { path: 'kanban', component: KanbanBoardComponent, canActivate: [AuthGuard], data: { roles: ['Project Lead', 'Admin'] } },
  { path: 'add-task', component: AddTaskComponent, canActivate: [AuthGuard] },
  { path: 'edit-task/:id', component: EditTaskComponent,canActivate: [AuthGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' } // Redirection vers Home si la route n'existe pas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
