import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { RoleEntity } from "../../infrastructure/db/entities/RoleEntity";
import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export class UserCreateDTO {
 @IsNotEmpty()
  name!: string;

  @IsEmail()
  email!: string;

  @MinLength(6)
  password!: string;

  @IsNotEmpty()
  roleId! :string;

 @CreateDateColumn()
 createdAt!:  Date;

@UpdateDateColumn()
 updatedAt!:  Date;
 
}
