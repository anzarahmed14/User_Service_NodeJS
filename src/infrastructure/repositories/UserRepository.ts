import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { AppDataSource } from "../db";
import { RoleEntity } from "../db/entities/RoleEntity";
import { UserEntity } from "../db/entities/UserEntity";
import { UserMapper } from "../mappers/UserMapper";


export class UserRepository implements IUserRepository{
   
    
   
    private repo = AppDataSource.getRepository(UserEntity);
    private roleRepo = AppDataSource.getRepository(RoleEntity);

    async findById(id: string): Promise<User | null> {
        const entity = await this.repo.findOneBy({id});
         if (!entity) {
            throw new Error(`User with id ${id} not found`);
        }
        return UserMapper.toDomain(entity);
    }
    
    async  create(user: User): Promise<User> {
      
    //    const entity = new UserEntity();
    //     entity.name = user.name!;
    //     entity.email = user.email!;
    //     entity.password = user.password!;
    //     //entity.role=user.role!;
    //     // const Id = user.roleId!;
    //     // const role = await this.repo.findOneBy(Id) ;

    //     entity.role =  user.role;
        
        console.log("user" ,  user)
       
        const newUser =  UserMapper.toEntity(user)

        const saved = await this.repo.save(newUser);
        return UserMapper.toDomain(saved);

    }

     async update(id: string, data: Partial<User>): Promise<User> {
       await this.repo.update(id,data);
       const updated = await this.repo.findOneBy({id});
       if (!updated) throw new Error("User not found");
       return UserMapper.toDomain(updated);
    }

    async delete(id: string): Promise<void> {
       await this.repo.delete({id});
    }

   async findAll(): Promise<User[]> {
        const allUser = await this.repo.find();
        const userDto = allUser.map(user => UserMapper.toDomain(user));
        return userDto;
    }
    
   async  findByName(username: string): Promise<User | null> {
        const entity = await this.repo.findOne({where:{name:username}});

        if(!entity){
            return Promise.resolve(null);
        }

       return UserMapper.toDomain(entity);
    }
    
}
