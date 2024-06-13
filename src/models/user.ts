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
        unique: true,
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    email: {
        type: DataTypes.STRING,
        unique: true,
    },

    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'full_name',
    },

    avatar: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'users',
    sequelize: sequelize,
    charset: 'utf8',
    timestamps: true
});
