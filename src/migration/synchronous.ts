import { Post, User, Category } from "@/models";
export class MigrationSynchronous {
    private models = [User, Category, Post];
    public async sync() {
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