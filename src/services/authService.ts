import { UserDTO } from "@/DTOs/userDTO";
import { AccessToken } from "@/interfaces";
import { UserMapper } from "@/mappers/UserMapper";
import { User } from "@/models";
import { Decrypt } from "@/utils";
import { Request } from "express";

export class AuthService {
    public login = (username: string, password: string): Promise<User | null> => {
        const hashedPassword = Decrypt.sha256(password);
        return User.findOne({ where: { username, password: hashedPassword } });
    }

    public me = (req: Request): { user: UserDTO | null, message: string, statusCode: number } => {
        const bearer = req.headers.authorization;
        const session = req.session;

        if(!bearer) {
            return { user: null, message: 'Unauthorized', statusCode: 401};
        }

        if(!bearer.startsWith('Bearer ')) {
            return { user: null, message: 'Prefix Bearer not found', statusCode: 401};
        }

        const token = bearer;
        const accessTokens = session.accessTokens as AccessToken;

        if(!accessTokens[token]) {
            return { user: null, message: 'Invalid token', statusCode: 401};
        }

        if(accessTokens[token].expires < Date.now()) {
            delete accessTokens[token];
            return { user: null, message: 'Token expired', statusCode: 401};
        }

        const user = accessTokens[token].user as User;
        const userDTO = UserMapper.toDTO(user);

        return { user: userDTO, message: 'OK', statusCode: 200};
    }
}