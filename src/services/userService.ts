import { CanCRUD } from "@/interfaces/canCRUD";
import { User } from "@/models";

export class UserService implements CanCRUD<User> {
    findAll = () => {
        return User.findAll();
    };
    findById = (id: number) => {
        return User.findOne({ where: { id } });
    };
    create = (data: User) => {
        return User.create({
            username: data.getDataValue('username'),
            email: data.getDataValue('email'),
            password: data.getDataValue('password'),
            fullName: data.getDataValue('fullName'),
            avatar: data.getDataValue('avatar')
        });
    
    }
    update = (id: number, data: User) => {
        const updateData: {
            username: string,
            email: string,
            password: string,
            fullName: string,
            avatar?: string
        
        } = {
            username: data.getDataValue('username'),
            email: data.getDataValue('email'),
            password: data.getDataValue('password'),
            fullName: data.getDataValue('fullName'),
        };
        const avatar = data.getDataValue('avatar');
        if(avatar) {
            updateData.avatar = avatar;
        }

        return User.update(updateData, { where: { id } });
    };
    delete = (id: number) => {
        return User.destroy({ where: { id } });
    };

}