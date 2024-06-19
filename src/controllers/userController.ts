import { UserMapper } from "@/mappers/UserMapper";
import { User } from "@/models";
import { UserService } from "@/services/userService";
import { Arrays } from "@/utils/Arrays";
import { Decrypt } from "@/utils/Decrypt";
import { Files } from "@/utils/Files";
import { ResponseBody } from "@/utils/ResponseBody";
import { configDotenv } from "dotenv";
import { Request, Response } from "express";
import { ForeignKeyConstraintError, SequelizeScopeError, UniqueConstraintError } from "sequelize";

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
        

        if(!Arrays.isEmpty(data)) {
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
        const { username, password, email, fullName } = req.body;
        const file = req.file;
        const avatar = Files.getPublicPath(file);
        const invalidFields = ResponseBody.getInvalidUserFields(req.body);
        if(invalidFields.length > 0) {
            Files.removeSync(file);
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
            Files.removeSync(file);
            return res.status(500).json({ 
                statusCode: 500,
                message: 'Internal server error',
                error: errorMessages
            });
        }
    }

    update = async (req: Request, res: Response) => {
        const { username, password, email, fullName } = req.body;
        const invalidFields = ResponseBody.getInvalidUserFields(req.body);
        const id = parseInt(req.params.id);
        if(invalidFields.length > 0) {
            return res.status(400).json({ 
                statusCode: 400,
                message: 'Invalid fields', 
                invalidFields 
            });
        }
        
        const file = req.file;
        const avatar = Files.getPublicPath(file);
        const oldUser = await this.userService.findById(id);
        const oldAvatar = oldUser?.avatar;

        const buildBody = avatar 
            ? { username, password: Decrypt.sha256(password), email, fullName, avatar }
            : { username, password: Decrypt.sha256(password), email, fullName }
        
        const user = User.build(buildBody);
        try {
            const [rowsAffected] = await this.userService.update(id, user);
            
            if(rowsAffected > 0) {
                const entryDir = process.env.UPLOAD_ENTRY_DIR as string;
                Files.removeSyncByPath(`${entryDir}${oldAvatar}`);
    
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
        } catch (error) {
            const sequelizeError = error as SequelizeScopeError;
            return res.status(500).json({
                statusCode: 500,
                message: 'Internal server error',
                error: sequelizeError.message
            });
        }
    }

    delete = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        try {
            const user = await this.userService.findById(id);
            if(user) {
                const avatar = user.avatar;
                const entryDir = process.env.UPLOAD_ENTRY_DIR as string;
                Files.removeSyncByPath(`${entryDir}${avatar}`);
            }
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
        } catch(error) {
            const sequelizeError = error as ForeignKeyConstraintError;
            res.status(500).json({
                statusCode: 500,
                message: 'Internal server error',
                error: sequelizeError.message
            });
        }
    }
}

export default new UserController();