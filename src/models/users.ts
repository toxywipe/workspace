import { Roles } from "./roles";

export interface User {
    username: string;
    password: string;
    workspace: string;
    role: Roles;
}
