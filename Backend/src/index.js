import dotenv from "dotenv";
import connectDB from "./db/index.js";
import {app} from "./app.js"

// Load environment variables from .env file
dotenv.config({
    path:'./env'
});

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 4000 , () => {
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("Mongo DB connection failed",err);
})  