import cors from "cors";
import "dotenv/config";
import Express from "express";
import mongoose from "mongoose";

import { SERVER_PORT } from "../config/index.js";
import { server_routes } from "../routes/index.js";
import   router  from "../routes/eventRoutes.js";

const server = Express();

// Enable CORS for all routes
server.use(cors());

// middlewares
server.use(Express.json({ limit: "100mb" }));

// routes (Global Routes)
server.use("/api", router);

server.use("*", async (req, res, next) => {
    return res.status(404).json({
        status: false,
        message: "Route not found",
    });
});
const PORT=process.env.SERVER_PORT;

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("DB Connection successful");
}).catch((err)=>{
    console.log(err.message);
});

server.listen(PORT, () => {
    console.log(`
    Server Started on http://localhost:${PORT}

    ---------------------------------------------------------------------------------------------

    FOR CANDIDATES::

    Welcome to ExpressJS Template.
    Setup local '.env.local' by renaming/copying from '.env.example'
    Setup database connections (if required)

    DATABSE:
    You need to setup connections as part of the assesment.
    We only provide '.env' setup

    ROUTING:
    'server_routes' is the index of all routes.
    It is recommended to create seperate routes
    and link them to './routes/index.js' file
    (See 'test-routes.js' for example)


    NOTE::  After completion of task, zip the entire code (excluding node_modules and .git/)
            And email/share the same to the HR department

    ---------------------------------------------------------------------------------------------
        `);
});

export default { server };
