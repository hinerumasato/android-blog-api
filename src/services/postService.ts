import { CanCRUD } from "@/interfaces/canCRUD";
import { Post } from "@/models";

export class PostService implements CanCRUD<Post> {

    findAll(): Promise<Post[]> {
        return Post.findAll();
    };

    findById(id: number): Promise<Post | null> {
        return Post.findOne({ where: { id } });
    };

    create(data: Post): Promise<Post> {
        return Post.create({
            title: data.getDataValue('title'),
            content: data.getDataValue('content'),
            userId: data.getDataValue('userId'),
            categoryId: data.getDataValue('categoryId')
        })
    };

    update(id: number, data: Post): Promise<[affectedCount: number]> {
        return Post.update({
            title: data.getDataValue('title'),
            content: data.getDataValue('content'),
            userId: data.getDataValue('userId'),
            categoryId: data.getDataValue('categoryId')
        }, { where: { id } })
    };

    delete(id: number): Promise<number> {
        return Post.destroy({ where: { id } });
    };
    

}