import { UserDTO } from "@/DTOs/userDTO"
import { User } from "@/models"

export class UserMapper {
    public static toDTO = (user: User): UserDTO => {
        return new UserDTO(
            user.getDataValue('id'),
            user.getDataValue('username'),
            user.getDataValue('email'),
            user.getDataValue('fullName'),
            user.getDataValue('avatar')
        );
    }
}