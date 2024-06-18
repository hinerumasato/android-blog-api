import { AccessToken } from "@/interfaces";
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

    public logout = async (req: Request, res: Response) => {
        const { user } = this.authService.me(req);
        const bearer = req.headers.authorization;

        if(!bearer) {
            return res.status(401).json({
                statusCode: 401,
                message: 'Unauthorized'
            });
        }

        if(user) {
            const accessTokens = req.session.accessTokens as AccessToken;
            delete accessTokens[bearer];
            return res.json({
                statusCode: 200,
                message: 'Logout successfully'
            });
        } else {
            return res.status(401).json({
                statusCode: 401,
                message: 'Unauthorized'
            });
        }
    }

    public me = async (req: Request, res: Response) => {
        const { user, message, statusCode } = this.authService.me(req);
        return res.status(statusCode).json({
            statusCode: statusCode,
            message: message,
            user: user
        });
    }
}

export default new AuthController();