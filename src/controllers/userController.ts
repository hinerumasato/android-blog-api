import { UserMapper } from "@/mappers/UserMapper";
import { User } from "@/models";
import { UserService } from "@/services/userService";
import { Arrays } from "@/utils/Arrays";
import { UserValidator } from "@/validators/UserValidator";
import { configDotenv } from "dotenv";
import { Request, Response } from "express";

class UserController {

    private userService: UserService;

    constructor() {
        configDotenv();
        this.userService = new UserService();
    }

    findAll = async (req: Request, res: Response) => {
        const { username, fullName, email } = req.query;
        let data: Array<User> | null = null;

        data = (Arrays.isContainElementValid([username, fullName, email]))
            ? await this.userService.findAllByCondition({ username, fullName, email })
            : await this.userService.findAll();


        if (!Arrays.isEmpty(data)) {
            data = data as Array<User>;
            const dtos = data.map(item => UserMapper.toDTO(item));
            return res.status(200).json({
                statusCode: 200,
                message: 'Get list user success',
                data: dtos
            })
        } else {
            return res.status(404).json({
                statusCode: 404,
                message: 'Not found'
            })
        }
    }

    findById = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const user = await this.userService.findById(id);
        if (user) {
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
        const validator = new UserValidator(req);
        if (!validator.validate()) {
            return res.status(400).json(validator.getError());
        }

        try {
            const user = await this.userService.saveOrUpdate(req) as User;
            return res.status(201).json({
                statusCode: 201,
                message: 'Create user successfully',
                data: UserMapper.toDTO(user)
            });
        }
        catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: 'Internal server error',
                error: error
            })
        }
    }

    update = async (req: Request, res: Response) => {
        const validator = new UserValidator(req);
        if (!validator.validate()) {
            return res.status(400).json(validator.getError());
        }
        try {
            const [affectedCount] = await this.userService.saveOrUpdate(req, false) as [number];
            return res.status(200).json({
                statusCode: 200,
                message: 'Update user successfully',
                affectedCount: affectedCount,
            });
        }
        catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: 'Internal server error',
                error: error
            });
        }
    }

    delete = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        try {
            const affectedCount = await this.userService.delete(id);
            res.json({
                statusCode: 200,
                message: 'User deleted successfully',
                affectedCount: affectedCount
            });
        } catch (error) {
            res.status(500).json({
                statusCode: 500,
                message: 'Internal server error',
                error: error
            });
        }
    }
}
export default new UserController();