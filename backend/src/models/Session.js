import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
problem:{
    type:String,
    required:true,
},
difficulty:{
    type:String,
    enum:["easy","medium","hard"],
    reuired:true,
},
host:{
 type: mongoose.Schema.Types.ObjectId,
ref:"User",
reuired:true,
},
participant:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    default:"null",
},
status:{
    type:String,
    enum:["Active","Completed"],
    default:"Active",
},
callId:{
    type:String,
    default:"",
},
},
{timestamps:true}
);

const Session = mongoose.model("Session",sessionSchema)
export default Session