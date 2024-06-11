import { Post, User, Category } from "@/models";

// (async () => {
//     await User.sync({ alter: true });
//     await Category.sync({ alter: true });
//     await Post.sync({ alter: true });
// })();

export class MigrationSynchronous {
    private models = [User, Category, Post];
    public async sync() {
        for (const model of this.models) {
            await model.sync({ alter: true });
        }
    }

    public async drop() {
        for (const model of this.models) {
            await model.drop();
        }
    }
}