import { Post } from "@/models";
import { Model, ModelStatic } from "sequelize";
import { AbstractService } from "./abstractService";

export class PostService extends AbstractService<Post> {
    protected get model(): ModelStatic<Model<{}, {}>> {
        return Post;
    }

    findAll = (): Promise<Post[]> => {
        return Post.findAll();
    };

    findById = (id: number): Promise<Post | null> => {
        return Post.findOne({ where: { id } });
    };

    create = (data: Post): Promise<Post> => {
        return Post.create({
            title: data.title,
            content: data.content,
            thumbnail: data.thumbnail,
            userId: data.userId,
            categoryId: data.categoryId,
        })
    };

    update = (id: number, data: Post): Promise<[affectedCount: number]> => {
        return Post.update({
            title: data.title,
            content: data.content,
            thumbnail: data.thumbnail,
            userId: data.userId,
            categoryId: data.categoryId,
        }, { where: { id } })
    };

    delete = (id: number): Promise<number> => {
        return Post.destroy({ where: { id } });
    };
}