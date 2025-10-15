import { UserCreateDTO } from "../../application/dtos/UserCreateDTO";
import { UserService } from "../../application/services/UserService";
import { Request, Response } from "express";
import { validate } from "class-validator";
import { UserEntity } from "../../infrastructure/db/entities/UserEntity";
import { UserUpdateDTO } from "../../application/dtos/UserUpdateDTO";

export class UserController {
    private service = new UserService();


    createUser = async (req: Request, res: Response) => {
        const dto = Object.assign(new UserCreateDTO(), req.body);

        try {
            // Validate DTO
            const errors = await validate(dto);
            if (errors.length > 0) {
                const formattedErrors = errors.map(err => ({
                    property: err.property,
                    constraints: err.constraints
                }));

                return res.status(400).json({
                    message: "Validation failed",
                    errors: formattedErrors
                });
            }

            // Call service
            const user = await this.service.createUser(dto);
            return res.status(201).json(user);

        } catch (error: any) {
            console.error("Error creating user:", error);

            return res.status(500).json({
                message: "Internal server error",
                error: error.message || error.toString()
            });
        }
    };
    getUser = async (req: Request, res: Response) => {
        const user = await this.service.getUserById(req.params.id);
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    }

    updateUser = async (req: Request, res: Response) => {
        const dto = Object.assign(new UserUpdateDTO, req.body);
        const id = req.params.id;
        const errors = await validate(dto);
        if (errors.length > 0) return res.status(400).json({ errors })
        const user = await this.service.updateUser(id, dto);
        res.json(user);
    }

    deleteUser = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            await this.service.deleteUser(id);
            res.send();
        } catch (error) {
            return res.status(404).json({ error: "User not found" });
        }
    }
    getAllUser = async (req: Request, res: Response) => {
        try {
            const allUser = await this.service.getUsers();
            res.json(allUser)
        } catch (error) {
            return res.status(404).json({ error: "User not found" });
        }
    }
    getUserByName = async (req: Request, res: Response) => {
        const user = await this.service.getUserByName(req.params.userName);
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    }
}