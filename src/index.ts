import express, { Application } from "express";
import { migrate, useMiddlewares } from "./configs/application";
const PORT = 3000;
const app: Application = express();

useMiddlewares(app);
migrate();

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});