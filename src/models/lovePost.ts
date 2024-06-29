import { sequelize } from "@/configs/database";
import { DataTypes, Model } from "sequelize";
import { User } from "./user";
import { Post } from "./post";

export class LovePost extends Model {
    public userId!: number;
    public postId!: number;

    public user!: User;
    public post!: Post;
}

LovePost.init({
    userId: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        field: 'user_id',
        references: {
            model: 'users',
            key: 'id',
        }
    },
    postId: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        field: 'post_id',
        references: {
            model: 'posts',
            key: 'id',
        }
    },
}, {
    tableName: 'love_posts',
    sequelize: sequelize,
    charset: 'utf8',
    timestamps: true
});