import { UserDTO } from "@/DTOs/userDTO"
import { User } from "@/models"

export class UserMapper {
    public static toDTO = (user: User): UserDTO => {
        return new UserDTO(
            user.id,
            user.username,
            user.email,
            user.fullName,
            user.avatar,
            user.DOB,
            user.story,
            user.relationship,
            user.relationshipDescription,
            user.nationality,
            user.nationalityDescription,
            user.company,
            user.companyDescription
        );
    }
}