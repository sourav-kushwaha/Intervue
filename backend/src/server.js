import express from "express";
import dotenv from "dotenv";

dotenv.config();


const app = express();

app.get("/sourav",(req,res)=>{
    res.status(200).json({msg:"success from api"})
});

const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log("server is running on port " + PORT);
})

