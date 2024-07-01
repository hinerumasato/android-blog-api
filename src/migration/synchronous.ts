import { Post, User, Category, LovePost, Comment } from "@/models";
export class MigrationSynchronous {
    private models = [User, Category, Post, LovePost, Comment];

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

        Comment.belongsTo(User, {
            targetKey: 'id',
            foreignKey: 'userId',
            as: 'user',
            onDelete: 'CASCADE',
        });

        Comment.belongsTo(Post, {
            targetKey: 'id',
            foreignKey: 'postId',
            as: 'post',
            onDelete: 'CASCADE',
        });

        Comment.belongsTo(Comment, {
            targetKey: 'id',
            foreignKey: 'replyTo',
            as: 'reply',
        });

        User.hasMany(Comment, {
            sourceKey: 'id',
            foreignKey: 'userId',
            as: 'comments',
            onDelete: 'CASCADE',
        });

        Post.hasMany(Comment, {
            sourceKey: 'id',
            foreignKey: 'postId',
            as: 'comments',
            onDelete: 'CASCADE',
        });

        Comment.hasMany(Comment, {
            sourceKey: 'id',
            foreignKey: 'replyTo',
            as: 'replies',
            onDelete: 'CASCADE',
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