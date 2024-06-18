import { sequelize } from "@/configs/database";
import { DataTypes, Model } from "sequelize";

export class Post extends Model {
    public id!: number;
    public title!: string;
    public content!: string;
    public userId!: number;
    public thumbnail!: string;
    public categoryId!: number;
}

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
    thumbnail: {
        type: DataTypes.STRING,
        allowNull: true,
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