import express, { Application } from "express";
import { migrate, useLibrary } from "./configs/application";
const PORT = 3000;
const app: Application = express();

useLibrary(app);
migrate();

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});