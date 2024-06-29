import { LovePost } from "@/models/lovePost";
import { AbstractService } from "./abstractService";
import { ModelStatic, Model, IndexHints } from "sequelize";
import { Post, User } from "@/models";

export class LovePostService extends AbstractService<LovePost> {
    findAll = (): Promise<LovePost[]> => {
        return LovePost.findAll({ include: [
            { model: User, as: 'user', attributes: { exclude: ['password'] } },
            { model: Post, as: 'post'},
        ]});
    }

    override findAllByCondition = (params: { [key: string]: any; }): Promise<LovePost[] | null> => {
        return LovePost.findAll({ where: params, include: [
            { model: User, as: 'user', attributes: { exclude: ['password'] } },
            { model: Post, as: 'post'},
        ], indexHints: [
            { type: IndexHints.USE, values: ['PRIMARY']}
        ]});
    }

    findById = (id: number): Promise<LovePost | null> => {
        throw new Error("Method not implemented.");
    };

    create = (data: LovePost): Promise<LovePost> => {
        return LovePost.create({
            userId: data.userId,
            postId: data.postId
        });
    };

    update = (id: number, data: LovePost): Promise<[affectedCount: number]> => {
        throw new Error("Method not implemented.");
    };

    delete = (id: number): Promise<number> => {
        throw new Error("Method not implemented.");
    };

    deleteByUserIdAndPostId = (userId: number, postId: number): Promise<number> => {
        return LovePost.destroy({ where: { userId, postId } });
    }

    protected get model(): ModelStatic<Model<{}, {}>> {
        return LovePost;
    }

}