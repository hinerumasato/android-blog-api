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
        const token = req.headers.authorization as  string;
        const accessTokens = req.session.accessTokens as AccessToken;
        const user = accessTokens[token].user as User;
        const userDTO = UserMapper.toDTO(user);

        return { user: userDTO, message: 'OK', statusCode: 200};
    }
}