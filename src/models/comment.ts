import { sequelize } from "@/configs/database";
import { DataTypes, Model } from "sequelize";

export class Comment extends Model {
    public id!: number;
    public postId!: number;
    public userId!: number;
    public content!: string;
    public replyTo!: number;
    public reply!: Comment;
}

Comment.init({
    id: {
        primaryKey: true,
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
    },
    postId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: 'post_id',
    },
    userId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: 'user_id',
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    replyTo: {
        type: DataTypes.BIGINT,
        allowNull: true,
        field: 'reply_to',
    },
}, {
    tableName: 'comments',
    sequelize: sequelize,
    timestamps: true,
    underscored: true,
    modelName: 'Comment',
})