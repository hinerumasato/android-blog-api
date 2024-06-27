import { Post, User, Category } from "@/models";
export class MigrationSynchronous {
    private models = [User, Category, Post];

    public async migrate() {
        await this.sync();
        await this.establishRelationship();
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