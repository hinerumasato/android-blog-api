import { Comment } from "@/models";
import { AbstractService } from "./abstractService";
import { ModelStatic, Model } from "sequelize";

export class CommentService extends AbstractService<Comment> {
    findAll: () => Promise<Comment[]> = async () => {
        return Comment.findAll();
    };

    findById: (id: number) => Promise<Comment | null> = async (id: number) => {
        return Comment.findOne({ where: { id } });
    };

    create: (data: Comment) => Promise<Comment> = async (data: Comment) => {
        return Comment.create({ ...data.dataValues });
    };

    update: (id: number, data: Comment) => Promise<[affectedCount: number]> = async (id: number, data: Comment) => {
        return Comment.update({ ...data.dataValues }, { where: { id } });
    };

    delete: (id: number) => Promise<number> = async (id: number) => {
        return Comment.destroy({ where: { id } });
    };

    protected get model(): ModelStatic<Model<{}, {}>> {
        return Comment;
    }

}