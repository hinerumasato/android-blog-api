import { sequelize } from "@/configs/database";
import { DataTypes, Model } from "sequelize";

export class Category extends Model {
    public id!: number;
    public name!: string;
}
Category.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'categories',
    timestamps: false,
});