import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
}))
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true, limit:"16kb"}));
app.use(cookieParser());

import appRouter from "./routes";

app.use("/api/user", appRouter);

export {app};
