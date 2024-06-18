import { User } from "@/models";
import { Decrypt } from "@/utils";

export class AuthService {
    public login = (username: string, password: string): Promise<User | null> => {
        const hashedPassword = Decrypt.sha256(password);
        return User.findOne({ where: { username, password: hashedPassword } });
    }
}