import mongoose from "mongoose"
import {ENV} from "./env.js"

export const connectDB = async()=>{
    try{
       const conn =  await mongoose.connect(ENV.DB_URL);
       console.log("connected to mongoDB", conn.connection.host);
    }
    catch(error){
       console.error("Error connecting the mongodb",error);
       process.exit(1)  //0 means success, and 1 means the failure of connection
    }
}