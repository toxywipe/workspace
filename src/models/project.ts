export interface Project {
    id: string;
    name: string;
    description: string;
    createdBy: string; // Username de l'admin ou du Project Lead
    workspace: string;
    members: { username: string; role: string }[]; // Liste des membres avec leurs rôles
    createdAt: Date;
}
  