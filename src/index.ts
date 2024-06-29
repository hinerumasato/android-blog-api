import express, { Application } from "express";
import { migrate, useMiddlewares, useStatic, useSwagger } from "./configs/application";

const PORT = 3000;
const app: Application = express();

useMiddlewares(app);
useStatic(app);
useSwagger(app);
migrate();


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`API documentation is running on http://localhost:${PORT}/api-docs`);
    
});