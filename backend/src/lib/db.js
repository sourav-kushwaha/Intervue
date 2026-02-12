import mongoose from "mongoose"
import {ENV} from "./env.js"

export const connectDB = async()=>{
    try{
      if(!ENV.DB_URL){
         throw new Error("DB URL IS NOT DEFINED IN THE ENVIRONMENT VARIABLE");
      }
       const conn =  await mongoose.connect(ENV.DB_URL);
       console.log("connected to mongoDB", conn.connection.host);
    }
    catch(error){
       console.error("Error connecting the mongodb",error);
       process.exit(1)  //0 means success, and 1 means the failure of connection
    }
}