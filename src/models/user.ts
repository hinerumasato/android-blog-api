import { sequelize } from "@/configs/database";
import { DataTypes, Model } from "sequelize";

export class User extends Model {
    public static getSequelize() {
        return sequelize;
    }
};
User.init({
    id: {
        primaryKey: true,
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'full_name',
    },
}, {
    tableName: 'users',
    sequelize: sequelize,
    charset: 'utf8',
    timestamps: true
});
