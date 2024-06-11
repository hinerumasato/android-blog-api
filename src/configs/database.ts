import { configDotenv } from "dotenv";
import { Sequelize } from "sequelize";
configDotenv();
export const sequelize = new Sequelize({
    dialect: process.env.DB_DIALECT as 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string),
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
});



sequelize.authenticate().then(() => {
    console.log('Database connect successfully');
    sequelize.query("SET time_zone = '+7:00';");
}).catch(() => {
    console.log('Database connect failed');
})

