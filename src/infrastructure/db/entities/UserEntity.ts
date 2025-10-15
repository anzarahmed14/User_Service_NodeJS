import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RoleEntity } from "./RoleEntity";

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name: string = "";

  @Column({ unique: true })
  email: string = "";

  @Column()
  password: string = "";

  @ManyToOne(() => RoleEntity, { eager: true })
  role!: RoleEntity; // 👈 THIS MUST EXIST

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
