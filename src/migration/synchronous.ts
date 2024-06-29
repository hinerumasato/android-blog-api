import { Post, User, Category } from "@/models";
import { LovePost } from "@/models/lovePost";
export class MigrationSynchronous {
    private models = [User, Category, Post, LovePost];

    public async migrate() {
        await this.establishRelationship();
        await this.sync();
    }

    private async establishRelationship() {
        User.hasMany(Post, {
            sourceKey: 'id',
            foreignKey: 'userId',
            as: 'posts',
        });

        Post.belongsTo(User, {
            targetKey: 'id',
            foreignKey: 'userId',
            as: 'user',
        });

        Category.hasMany(Post, {
            sourceKey: 'id',
            foreignKey: 'categoryId',
            as: 'posts',
        });

        Post.belongsTo(Category, {
            targetKey: 'id',
            foreignKey: 'categoryId',
            as: 'category',
        });

        User.belongsToMany(Post, { through: LovePost, foreignKey: 'userId', otherKey: 'postId', onDelete: 'CASCADE' });
        Post.belongsToMany(User, { through: LovePost, foreignKey: 'postId', otherKey: 'userId', onDelete: 'CASCADE' });

        LovePost.belongsTo(User, { 
            targetKey: 'id',
            foreignKey: 'userId',
            as: 'user',
        });
        LovePost.belongsTo(Post, { 
            foreignKey: 'postId',
            targetKey: 'id',
            as: 'post',
        });
    }

    private async sync() {
        for (const model of this.models) {
            await model.sync();
        }
    }

    public async drop() {
        for (const model of this.models) {
            await model.drop();
        }
    }
}