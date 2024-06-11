import { sequelize } from "@/configs/database";
import { DataTypes, Model } from "sequelize";

export class Post extends Model {}

Post.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    userId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: 'user_id',
        references: {
            model: 'users',
            key: 'id',
        }
    },
    categoryId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: 'category_id',
        references: {
            model: 'categories',
            key: 'id',
        }
    },
}, {
    tableName: 'posts',
    sequelize: sequelize,
    charset: 'utf8',
    timestamps: true
});