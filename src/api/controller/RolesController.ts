import { validate } from "class-validator";
import { RoleCreateDTO } from "../../application/dtos/RoleCreateDTO";
import { RoleService } from "../../application/services/RoleService";
import { Request, Response } from "express";
import { RoleUpdateDTO } from "../../application/dtos/RoleUpdateDTO";


export class RolesController{
    private roleService = new RoleService();

    createRole = async(req:Request,res:Response) =>{
        
        const dto = Object.assign(new RoleCreateDTO(),req.body);
         console.log(`DTO  ${JSON.stringify(dto)}`);
        const error = await validate(dto); 
         if (error.length > 0) return res.status(400).json({ error });
        const role= await this.roleService.createRole(dto);
         res.status(201).json(role);
    }

    updateRole = async(req:Request,res:Response)=>{
       
            const dto = Object.assign(new RoleUpdateDTO(),req.body);
            const id = req.params.id;
            await validate(dto); 
        const error = await validate(dto); 
             if (error.length > 0) return res.status(400).json({ error });
             const role = await this.roleService.updateRole(id,dto);
            res.json(role);
        

    }

    getRoleByName = async(req:Request,res:Response)=>{
        const name = req.params.roleName;
        const  roleName = await this.roleService.getRoleByName(name);
         if(!roleName) return res.status(404).json({error: "User not found"});
        res.json(roleName);
    }

    getRoleById = async(req:Request,res:Response)=>{
        try{const id = req.params.id;
        const role = await this.roleService.getRoleById(id);
        res.json(role);
        }catch(error){
            return res.status(404).json({error: "Role not found"});
        }
    }

    deleteRoleById = async(req:Request,res:Response) =>{
        try{
            const id = req.params.id;
            await this.roleService.deleteRoleById(id);
             res.send();
        }catch(error){
             return res.status(404).json({error: "Role not found"});
        }
    }

    getAll = async(req:Request,res:Response)=>{
        try{
            const roles = await this.roleService.getAllRoles();
            res.json(roles);
        }catch(error){
             return res.status(404).json({error: "Role not found"});
        }
    }
}