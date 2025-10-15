import {User} from "../entities/User"

export interface IUserRepository {
    findById(id:string):Promise<User | null>;
    findAll():Promise<User[]>;
     create(user: User):Promise<User>;
     update(id:string, data: Partial<User>):Promise<User>;
     delete(id:string):Promise<void>;
     findByName(userName:string):Promise<User | null>;
}