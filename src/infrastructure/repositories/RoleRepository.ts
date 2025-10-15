import { role } from "../../domain/entities/Role";
import { IRoleRepository } from "../../domain/repositories/IRoleRepository";
import { AppDataSource } from "../db";
import { RoleEntity } from "../db/entities/RoleEntity";

export class RoleRepository implements IRoleRepository{
    async findAllRole(): Promise<role[]> {
         const entities = await this.repo.find();
         return entities.map(e => new role(e.id,e.roleName,e.isActive))
    }
    

    private repo = AppDataSource.getRepository(RoleEntity);
    
    async findRoleById(id: string): Promise<role | null> {
      const entity = await this.repo.findOneBy({id}) ;
      if (!entity) throw new Error("Role not found");
       return entity ;
    }
    async updateRole(id: string, data: Partial<role>): Promise<role> {
        await this.repo.update(id, data);
        const updated = await this.repo.findOneBy({ id });
        if (!updated) throw new Error("User not found");
        return new role(updated.id, updated.roleName, updated.isActive);
    }

async getRoleByName(roleName: string): Promise<role| null> {
       const entity = await this.repo.findOneBy({roleName})
       if (!entity) throw new Error("Role not found");
       return new role(entity.id,entity.roleName,entity.isActive) ;
       
    }
 
    async deleteRole(id: string): Promise<void> {
       await this.repo.delete({id})
    }

    
   async createRole(Role:Partial<role>): Promise<role> {
       const entity = new RoleEntity();
      
        entity.roleName = Role.roleName!;
        entity.isActive = Role.isActive!;

        const saveRole = await this.repo.save(entity);

        

       return new role(saveRole.id, saveRole.roleName, saveRole.isActive);
   }
     
   
}