import { User } from "@/models";
import { Model, ModelStatic } from "sequelize";
import { AbstractService } from "./abstractService";

export class UserService extends AbstractService<User> {
    protected get model(): ModelStatic<Model<{}, {}>> {
        return User;
    }

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

        const updateData = {
            username: data.username,
            password: data.password,
            email: data.email,
            fullName: data.fullName,
            avatar: data.avatar
        }

        return User.update(updateData, { where: { id } });
    };
    delete = (id: number) => {
        return User.destroy({ where: { id } });
    };
}