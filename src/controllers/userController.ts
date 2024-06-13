import { UserMapper } from "@/mappers/UserMapper";
import { User } from "@/models";
import { UserService } from "@/services/userService";
import { Decrypt } from "@/utils/Decrypt";
import { ResponseBody } from "@/utils/ResponseBody";
import { Request, Response } from "express";
import { UniqueConstraintError } from "sequelize";

class UserController {

    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    findAll = async (req: Request, res: Response) => {
        const data = await this.userService.findAll();
        const dtos = data.map(item => UserMapper.toDTO(item));
        return res.status(200).json({
            statusCode: 200,
            message: 'Get list user success',
            data: dtos
        })
    }

    findById = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const user = await this.userService.findById(id);
        if(user) {
            return res.status(200).json({
                statusCode: 200,
                message: 'Success',
                data: UserMapper.toDTO(user)
            })
        } else {
            return res.status(404).json({
                statusCode: 404,
                message: 'Not found',
            })
        }
    }

    create = async (req: Request, res: Response) => {
        const { username, password, email, fullName, avatar } = req.body;
        const invalidFields = ResponseBody.getInvalidUserFields(req.body);
        if(invalidFields.length > 0) {
            return res.status(400).json({ 
                statusCode: 400,
                message: 'Invalid fields', invalidFields 
            });
        }
        try {
            const hashedPassword = Decrypt.sha256(password);
            const user = User.build({ username, password: hashedPassword, email, fullName, avatar });
            const createdUser = await this.userService.create(user);
            return res.status(201).json({
                statusCode: 201,
                message: 'User created successfully',
                data: UserMapper.toDTO(createdUser)
            });
        } catch (error) {
            const uniqueError = error as UniqueConstraintError;
            const errorMessages = uniqueError.errors.map((error) => error.message);
            return res.status(500).json({ 
                statusCode: 500,
                message: 'Internal server error',
                error: errorMessages
            });
        }
    }

    update = async (req: Request, res: Response) => {
        const invalidFields = ResponseBody.getInvalidUserFields(req.body);
        const id = parseInt(req.params.id);
        if(invalidFields.length > 0) {
            return res.status(400).json({ 
                statusCode: 400,
                message: 'Invalid fields', 
                invalidFields 
            });
        }

        const user = User.build({ ...req.body });
        const [rowsAffected] = await this.userService.update(id, user);
        if(rowsAffected > 0) {
            return res.status(200).json({
                statusCode: 200,
                message: 'Update user successfully',
                rowsAffected
            })
        } else {
            return res.status(400).json({
                statusCode: 400,
                message: 'User not found'
            })
        }
    }

    delete = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const affectedCount = await this.userService.delete(id);
        if(affectedCount > 0) {
            res.json({
                statusCode: 200,
                message: 'User deleted successfully',
                affectedCount: affectedCount
            });
        } 
        else {
            res.status(404).json({
                statusCode: 404,
                message: 'User not found' 
            });
        }
    }
}

export default new UserController();