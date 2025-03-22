import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    Credential: true
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import

import userRouter from "./routes/user.routes.js"
import postRouter from "./routes/post.routes.js"

//routes declaration
app.use("/api/v2/users",userRouter)
app.use("/api/v2/post",postRouter)
app.get('/api/health', (req, res) => {
    res.status(200).json({ message: "Service is healthy!" });
});

export {app};
