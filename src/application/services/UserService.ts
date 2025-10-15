import { User } from "../../domain/entities/User";
import { RoleRepository } from "../../infrastructure/repositories/RoleRepository";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { UserCreateDTO } from "../dtos/UserCreateDTO";
import { UserUpdateDTO } from "../dtos/UserUpdateDTO";
import {v4 as  uuidv4} from 'uuid';


export class UserService {

    private repo = new UserRepository();

    private roleRepo = new RoleRepository()

    async getUserById(id:string){
        return this.repo.findById(id);

    }

    async createUser(dto: UserCreateDTO) {
const roleEntity = await this.roleRepo.findRoleById(dto.roleId);
 if (!roleEntity) throw new Error(`Role not found ${dto.roleId}`)



        const user : User ={
            id: uuidv4(),
            name :  dto.name,
            email : dto.email,
            password: dto.password,
            role:roleEntity,
            createdAt:  new Date(),
            updatedAt:  new Date(), 

        }     
        console.log("Services user" , user);
        return this.repo.create(user);

        // return this.repo.create({
        // name: dto.name,
        // email: dto.email,
        // password: dto.password,
        //     role: roleEntity ,
        // updatedAt:dto.updatedAt,
        // createdAt:dto.createdAt
        // });
    }
    async updateUser(id:string, dto: UserUpdateDTO){
        return this.repo.update(id,{
            name:dto.name,
            email:dto.email,
            password:dto.password
        })
    }

    async deleteUser(id:string){
        return this.repo.delete(id);
    }

    async getUsers(){
        return this.repo.findAll();
    }

    async getUserByName(userName:string):Promise<User|null>{
        return await this.repo.findByName(userName);
    }
  }