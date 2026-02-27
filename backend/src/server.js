import express from "express";
import dotenv from "dotenv";
import path from "path";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { functions, inngest } from "./lib/inngest.js";
import { serve } from "inngest/express";
import { clerkMiddleware } from '@clerk/express';
import chatRoutes from "./routes/chatRoutes.js"
import sessionRoute from "./routes/sessionRoute.js";


import cors from "cors";
dotenv.config();
console.log("SERVER ENV CHECK:");
console.log("EVENT KEY:", process.env.INNGEST_EVENT_KEY);
console.log("SIGNING KEY:", process.env.INNGEST_SIGNING_KEY);

const app = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}));
app.use(clerkMiddleware());
app.use("/api/inngest", serve({
  client: inngest,
  functions
}))


app.get("/sourav",(req,res)=>{
    res.status(200).json({msg:"success from api"})
});
app.get("/mummy",(req,res)=>{
    res.status(200).json({msg:"success from api"})
});
app.use("/api/chat",chatRoutes);
app.use("/api/sessions",sessionRoute);
const PORT = process.env.PORT;





if (process.env.NODE_ENV === "production") {

  const frontendPath = path.join(
  process.cwd(),
  "frontend",
  "dist"
);

  console.log("Serving frontend from:", frontendPath);

  app.use(express.static(frontendPath));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
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