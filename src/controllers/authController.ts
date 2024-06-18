import { AccessToken } from "@/interfaces";
import { UserMapper } from "@/mappers/UserMapper";
import { User } from "@/models";
import { AuthService } from "@/services";
import { Decrypt } from "@/utils";
import { Request, Response } from "express";

class AuthController {

    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    public login = async (req: Request, res: Response) => {

        const { username, password } = req.body;
        const user = await this.authService.login(username, password);
        if (user) {
            const session = req.session;
            const token = 'Bearer ' + Decrypt.generateUserToken(user);
            const accessTokens = session.accessTokens as AccessToken;

            if(!accessTokens[token]) {
                accessTokens[token] = {
                    user: user,
                    expires: Date.now() + 3600000 * 24 * 7,
                }
            }
        
            return res.json({
                statusCode: 200,
                message: 'Login successfully',
                accessToken: token
            });
        } else {
            return res.status(401).json({
                statusCode: 401,
                message: 'Invalid username or password'
            });
        }
    }

    public me = async (req: Request, res: Response) => {
        const bearer = req.headers.authorization;
        const session = req.session;

        if(!bearer) {
            return res.status(401).json({
                statusCode: 401,
                message: 'Unauthorized'
            });
        }

        if(!bearer.startsWith('Bearer ')) {
            return res.status(401).json({
                statusCode: 401,
                message: 'Prefix Bearer not found'
            });
        }
        
        const token = bearer;
        const accessTokens = session.accessTokens as AccessToken;
        
        if(!accessTokens[token]) {
            return res.status(401).json({
                statusCode: 401,
                message: 'Invalid token'
            });
        }

        const accessToken = accessTokens[token];
        if(accessToken.expires < Date.now()) {
            delete accessTokens[token];
            return res.status(401).json({
                statusCode: 401,
                message: 'Token expired'
            });
        }


        const user = accessToken.user as User;
        const userDTO = UserMapper.toDTO(user);

        return res.json({
            statusCode: 200,
            message: 'Success',
            data: userDTO
        });
    }
}

export default new AuthController();