import express from "express";
import subsRoutes from "./routes/subs";
import authRoutes from "./routes/auth";
import articleRoutes from "./routes/articles";
import mongoose from "mongoose";
import * as global from "./globalvars/global";
import cors from "cors";



mongoose.connect(
    global.MONGO_URI
)
.then(() => {

    const app = express();

    app.use(express.json());
    app.use(cors())
    app.use("/auth", authRoutes);
    app.use("/subs", subsRoutes);
    app.use("/articles", articleRoutes);

    console.log("Connected to MongoDB");

    app.listen(5000, () => {
        console.log(`Now listening to port 5000`);
    });
})
.catch((error) => {
    console.log(error)
    throw new Error(error)
})

