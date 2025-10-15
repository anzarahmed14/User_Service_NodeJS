import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("roles")
export class RoleEntity{
    @PrimaryGeneratedColumn("uuid")
    id!:string;

    @Column()
    roleName:string="";

    @Column()
    isActive:boolean=true;

}