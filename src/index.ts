import express, { Application } from "express";
import { migrate, useMiddlewares, useStatic } from "./configs/application";
import swaggerUi from "swagger-ui-express";
const swaggerDocument =  require("@/docs/swagger.json")

const PORT = 3000;
const app: Application = express();

useMiddlewares(app);
useStatic(app);
migrate();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`API documentation is running on http://localhost:${PORT}/api-docs`);
    
});