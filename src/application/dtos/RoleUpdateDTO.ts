import { IsNotEmpty } from "class-validator";

export class RoleUpdateDTO{
    @IsNotEmpty()
    roleName!:string;

    @IsNotEmpty()
    isActive!:boolean;

}