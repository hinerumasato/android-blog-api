import { UserDTO } from "@/DTOs/userDTO";
import { UserMapper } from "@/mappers/UserMapper"
import { User } from "@/models"

describe('UserMapper Test', () => {
    it("should return DTO", () => {
        const userObj = {
            id: 1,
            username: 'user',
            password: 'password',
            email: 'test@gmail.com',
            fullName: 'Test',
        }
        const user = {
            getDataValue: (key: string) => {
                if(key === 'id') return userObj.id;
                if(key === 'username') return userObj.username;
                if(key === 'email') return userObj.email;
                if(key === 'fullName') return userObj.fullName;
                return null;
            }
        } as unknown as User;
        const userDTO = UserMapper.toDTO(user);

        expect(userDTO).toEqual(new UserDTO(1, 'user', 'test@gmail.com', 'Test'));
    })
})