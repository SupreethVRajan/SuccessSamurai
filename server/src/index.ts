import express from "express";
import subsRoutes from "./routes/subs";
import authRoutes from "./routes/auth";
import articleRoutes from "./routes/articles";
import mongoose from "mongoose";
import * as global from "./globalvars/global";
import cors from "cors";
import logger from "../logs/logging";


const app = express();

app.use(express.json());
app.use(cors())
app.use("/auth", authRoutes);
app.use("/subs", subsRoutes);
app.use("/articles", articleRoutes);

mongoose.connect(
    global.MONGO_URI
)
    .then(() => {
    
        logger.error("Mongo DB connection successful");

        console.log("Connected to MongoDB");

    app.listen(5000, () => {
        console.log(`Now listening to port 5000`);
    });
})
.catch((error) => {
    console.log(error)
    logger.error("Mongo DB connection failed");
    throw new Error(error)
})

export default app;