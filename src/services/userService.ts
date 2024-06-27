import { Post, User } from "@/models";
import { Model, ModelStatic, UniqueConstraintError } from "sequelize";
import { AbstractService } from "./abstractService";
import { Request } from "express";
import { Files } from "@/utils/Files";
import { Decrypt } from "@/utils";
import { UserNotFoundError } from "@/errors";

export class UserService extends AbstractService<User> {
    protected get model(): ModelStatic<Model<{}, {}>> {
        return User;
    }

    findAll = () => {
        return User.findAll({
            include: { model: Post, as: 'posts'},
        });
    };
    findById = (id: number) => {
        return User.findOne({ where: { id } });
    };
    create = (data: User) => {
        return User.create({
            ...data.dataValues,
        });
    }
    update = async (id: number, data: User): Promise<[affectedCount: number]> => {
        const user = await this.findById(id);
        
        if(user) {
            if (data.dataValues.hasOwnProperty('avatar')) {
                const avatar = user.avatar;
                Files.removePublicFileSyncByPath(avatar);
            }
            delete data.dataValues.id;
            return await User.update({ ...data.dataValues }, { where: { id } });            
        }
        throw new UserNotFoundError();
    };

    delete = async (id: number): Promise<number> => {
        const user = await this.findById(id);
        if(user) {
            const avatar = user.avatar;
            Files.removePublicFileSyncByPath(avatar);
            return await User.destroy({ where: { id } });
        }
        throw new UserNotFoundError();
    };

    public saveOrUpdate = async (req: Request, isCreate = true): Promise<User | [affectedCount: number]> => {
        const file = req.file;
        const avatar = Files.getPublicPath(file);
        const hashedPassword = Decrypt.sha256(req.body.password);
        let user: User;
        if(req.body.DOB)
            user = User.build({ ...req.body, password: hashedPassword, DOB: new Date(req.body.DOB), avatar });
        else user = User.build({ ...req.body, password: hashedPassword, avatar });
        try {
            if(isCreate) {
                const createdUser = await this.create(user);
                return createdUser;
            } else {            
                const { isUpload } = req.body;
                if(!avatar && !isUpload || isUpload === 'false')
                    delete user.dataValues.avatar;
                
                const id = parseInt(req.params.id);
                return await this.update(id, user);
            }
        } catch (error) {            
            Files.removeSync(file);
            throw error;
        }
    }
}