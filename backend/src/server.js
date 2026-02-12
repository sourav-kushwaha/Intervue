import express from "express";
import dotenv from "dotenv";
import path from "path";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";


dotenv.config();


const app = express();
const __dirname = path.resolve();

app.get("/sourav",(req,res)=>{
    res.status(200).json({msg:"success from api"})
});
app.get("/mummy",(req,res)=>{
    res.status(200).json({msg:"success from api"})
});

const PORT = process.env.PORT;

//making our app ready for the deployment
if(ENV.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));
    app.get("/{*any}", (req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist", "index.html"))
    });
}

const startServer = async () => {
try {
    await connectDB();
    app.listen(ENV.PORT,()=>{
    console.log("server is runing on the port", ENV.PORT);
    });
} catch (error) {
    console.error("Error starting the server",error);
}
};

startServer();