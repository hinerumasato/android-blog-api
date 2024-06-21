import { User } from "@/models";
import { Model, ModelStatic, UniqueConstraintError } from "sequelize";
import { AbstractService } from "./abstractService";
import { Request } from "express";
import { Files } from "@/utils/Files";
import { Decrypt } from "@/utils";

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
            ...data.dataValues,
        });
    }
    update = (id: number, data: User) => {
        console.log(data);
        
        const updateData = { ...data.dataValues };
        delete updateData.id;
        return User.update(updateData, { where: { id } });
    };
    delete = (id: number) => {
        return User.destroy({ where: { id } });
    };

    public createOrUpdateUser = async (req: Request, isCreate = true): Promise<User | [affectedCount: number]> => {
        const file = req.file;
        const avatar = Files.getPublicPath(file);
        const hashedPassword = Decrypt.sha256(req.body.password);
        const user = User.build({ ...req.body, password: hashedPassword, DOB: new Date(req.body.DOB), avatar });
        try {
            if(isCreate) {
                const createdUser = await this.create(user);
                return createdUser;
            } else {            
                const id = parseInt(req.params.id);
                return await this.update(id, user);
            }
        } catch (error) {            
            Files.removeSync(file);
            throw error;
        }
    }
}