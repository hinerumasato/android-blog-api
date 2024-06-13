import { User } from "@/models";
import { UserService } from "@/services/userService";
import { ResponseBody } from "@/utils/ResponseBody";
import { Request, Response } from "express";
import { UniqueConstraintError } from "sequelize";

class UserController {

    private userService: UserService;

    constructor() {
        this.userService = new UserService();
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
            const user = User.build({ username, password, email, fullName, avatar });
            const createdUser = await this.userService.create(user);
            return res.status(201).json({
                statusCode: 201,
                message: 'User created successfully',
                data: createdUser
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
}

export default new UserController();