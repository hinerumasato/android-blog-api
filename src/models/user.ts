import { sequelize } from "@/configs/database";
import { DataTypes, Model } from "sequelize";
import { Post } from "./post";

export class User extends Model {
    public id!: number;
    public username!: string;
    public password!: string;
    public email!: string;
    public fullName!: string;
    public avatar!: string;
    public DOB!: Date;
    public story!: string;
    public relationship!: string;
    public relationshipDescription!: string;
    public nationality!: string;
    public nationalityDescription!: string;
    public company!: string;
    public companyDescription!: string;
    public posts!: Array<Post>
    public comments!: Array<Comment>

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

    DOB: {
        type: DataTypes.DATE,
        allowNull: true,
    },

    story: {
        type: DataTypes.TEXT,
        allowNull: true,
    },

    relationship: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    relationshipDescription: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'relationship_description',
    },

    nationality: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    
    nationalityDescription: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'nationality_description',
    },

    company: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    
    companyDescription: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'company_description',
    },
}, {
    tableName: 'users',
    sequelize: sequelize,
    charset: 'utf8',
    timestamps: true
});