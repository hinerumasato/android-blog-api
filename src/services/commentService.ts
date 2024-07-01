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
        const replyTo = data.replyTo;
        return Comment.create({ ...data.dataValues, replyTo: replyTo == 0 ? null : replyTo});
    };

    update: (id: number, data: Comment) => Promise<[affectedCount: number]> = async (id: number, data: Comment) => {
        const replyTo = data.replyTo;
        return Comment.update({ ...data.dataValues, replyTo: replyTo == 0 ? null : replyTo}, { where: { id } });
    };

    delete: (id: number) => Promise<number> = async (id: number) => {
        return Comment.destroy({ where: { id } });
    };

    protected get model(): ModelStatic<Model<{}, {}>> {
        return Comment;
    }

}