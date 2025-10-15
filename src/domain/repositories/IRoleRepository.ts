import { role } from "../entities/Role";

export interface IRoleRepository{
    findRoleById(id:string): Promise<role | null>;
    createRole(Role:Partial<role>): Promise<role>;
    updateRole(id: string,data:Partial<role>): Promise<role>;
    deleteRole(id:string):Promise<void>;
    getRoleByName(roleName:string): Promise<role | null>;
    findAllRole():Promise<role[]>;
}