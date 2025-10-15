import { User } from "../../domain/entities/User";
import { UserEntity } from "../db/entities/UserEntity";
import { RoleEntity } from "../db/entities/RoleEntity"; // ✅ Make sure this import exists

export class UserMapper {

    static toDomain(entity: UserEntity): User {
        const user: User = {
            id: entity.id,
            name: entity.name,
            email: entity.email,
            password: entity.password,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            role: {
                id: entity.role.id,
                roleName: entity.role.roleName,
                isActive: entity.role.isActive,
            }
        };

        return user;


    }

    static toEntity(domain: User): UserEntity {
        const entity = new UserEntity();

        if (domain.id) {
            entity.id = domain.id; // optional, skip if DB auto-generates
        }

        entity.name = domain.name;
        entity.email = domain.email;
        entity.password = domain.password;

        // ✅ FIX: Convert domain.role to RoleEntity
        const roleEntity = new RoleEntity();
        roleEntity.id = domain.role.id!;
        roleEntity.roleName = domain.role.roleName;
        roleEntity.isActive = domain.role.isActive;
        entity.role = roleEntity;

        entity.createdAt = domain.createdAt;
        entity.updatedAt = domain.updatedAt;

        return entity;
    }
}
