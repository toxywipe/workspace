import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { AuthService } from '../../services/auth.service';
import { Project } from 'src/models/project';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-project-manager',
  templateUrl: './project-manager.component.html',
  styleUrls: ['./project-manager.component.css']
})
export class ProjectManagerComponent implements OnInit {
  projects: Project[] = [];
  projectMembers: { username: string; role: string }[] = [];
  newProject = { name: '', description: '' };
  newMember = { username: '', role: 'Developer' };
  projectError: string = '';
  memberError: string = '';
  currentProjectId: string = ''; // Projet actif
  currentProject: Project | null = null; // Stocke les détails du projet sélectionné
  invitationCode: string = '';


  constructor(private projectService: ProjectService, private authService: AuthService) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.projects = this.projectService.getProjects().filter(p => p.workspace === user.workspace);
    }
  }

  // Charger les membres dès qu'un projet est sélectionné
  loadMembers(projectId: string): void {
    this.currentProjectId = projectId;
    this.projectMembers = this.projectService.getProjectMembers(projectId);
  }

  // Ajouter un projet avec validation
  addProject(): void {
    if (!this.newProject.name.trim()) {
      this.projectError = "Le nom du projet est requis.";
      return;
    }

    const user = this.authService.getCurrentUser();
    if (!user) return;

    const newProject: Project = {
      id: uuidv4(),
      name: this.newProject.name,
      description: this.newProject.description || "Aucune description",
      createdBy: user.username,
      workspace: user.workspace,
      members: [{ username: user.username, role: "Project Lead" }],
      createdAt: new Date()
    };

    this.projectService.addProject(newProject);
    this.projects.push(newProject);

    // Réinitialiser les champs et les erreurs
    this.newProject.name = '';
    this.newProject.description = '';
    this.projectError = '';
  }

  // Supprimer un projet sans affecter les autres
  deleteProject(projectId: string, event: Event): void {
    event.stopPropagation(); // Empêche le clic de sélectionner le projet
    this.projectService.deleteProject(projectId);
    this.projects = this.projects.filter(p => p.id !== projectId);

    if (this.currentProjectId === projectId) {
        this.currentProjectId = '';
        this.currentProject = null;
        this.projectMembers = [];
    }
  }
  // Désélectionner un projet et revenir à l'affichage initial
  deselectProject(): void {
    this.currentProjectId = '';
    this.currentProject = null;
    this.projectMembers = [];
  }


  // Charger les détails du projet et les membres
  loadProjectDetails(projectId: string): void {
    this.currentProjectId = projectId;
    this.currentProject = this.projects.find(p => p.id === projectId) || null;
    this.projectMembers = this.projectService.getProjectMembers(projectId);
  }

  // Ajouter un membre au projet actif
  addMember(): void {
    if (!this.currentProjectId) return;

    if (!this.newMember.username.trim()) {
        this.memberError = "Le nom d'utilisateur est requis.";
        return;
    }

    this.projectService.addMemberToProject(this.currentProjectId, this.newMember.username, this.newMember.role);
    this.loadProjectDetails(this.currentProjectId);

    // Réinitialiser les champs et les erreurs
    this.newMember.username = '';
    this.memberError = '';
  }

  // Supprimer un membre
  removeMember(username: string): void {
    if (!this.currentProjectId) return;

    this.projectService.removeMemberFromProject(this.currentProjectId, username);
    this.loadProjectDetails(this.currentProjectId);
  }

  // Générer un code d’invitation unique pour un projet
  generateInvitationCode(projectId: string): void {
    const code = Math.random().toString(36).substring(2, 10); // Génère un code unique
    localStorage.setItem(`invitation_${projectId}`, code); // Stocke le code
    alert(`Code d'invitation généré : ${code}`);
  }

  // Récupérer le code d’un projet
  getInvitationCode(projectId: string): string | null {
    return localStorage.getItem(`invitation_${projectId}`);
  }

  // Rejoindre un projet via un code d’invitation
  joinProjectByCode(code: string): void {
    const projectId = Object.keys(localStorage).find(key => 
        key.startsWith("invitation_") && localStorage.getItem(key) === code
    )?.replace("invitation_", "");

    if (projectId) {
        const user = this.authService.getCurrentUser();
        if (!user) return;

        this.projectService.addMemberToProject(projectId, user.username, "Developer");
        this.loadProjectDetails(projectId);
        alert(`Vous avez rejoint le projet avec succès !`);
    } else {
        alert("Code invalide !");
    }
  }

}
