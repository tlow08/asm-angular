import express from "express";
import router from "./routes/index.js";
import connectMongoDB from "./config/dbconfig.js";

const app = express();
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.json());
connectMongoDB("mongodb://localhost:27017/asm-angular-fall24");
app.listen(8000);
app.use("/api", router);
export const viteNodeApp = app;