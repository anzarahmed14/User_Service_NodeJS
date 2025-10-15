import { RoleRepository } from "../../infrastructure/repositories/RoleRepository";
import { RoleCreateDTO } from "../dtos/RoleCreateDTO";
import { RoleUpdateDTO } from "../dtos/RoleUpdateDTO";

export class RoleService{
    private repo = new RoleRepository();

    async createRole(dto:RoleCreateDTO){
        return this.repo.createRole(
           {
               roleName: dto.roleName,
               isActive: dto.isActive
               
           }
        );
    }

    async updateRole(id:string,dto:RoleUpdateDTO){
        return this.repo.updateRole(id,{
            roleName: dto.roleName,
               isActive: dto.isActive
        })
    }

    getRoleByName(name:string){
        return this.repo.getRoleByName(name);

    }

    getRoleById(id:string){
        return this.repo.findRoleById(id);
    }

    deleteRoleById(id:string){
        return this.repo.deleteRole(id);
    }

    getAllRoles(){
        return this.repo.findAllRole();
    }
}