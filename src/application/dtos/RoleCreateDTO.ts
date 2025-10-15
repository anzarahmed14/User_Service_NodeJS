import { IsNotEmpty } from "class-validator";

export class RoleCreateDTO{
    @IsNotEmpty()
    roleName!:string;

    @IsNotEmpty()
    isActive!:boolean;

}