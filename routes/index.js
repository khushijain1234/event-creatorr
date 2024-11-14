import multer from "multer";
import { Router } from "express";

import { MONTHS } from "../config/index.js";
import { test_routes } from "./test-routes.js";

// for multer (if required)
const directory =
    "./" +
    `public/images/${new Date().getUTCFullYear()}/${
        MONTHS[new Date().getMonth()]
    }`;

const fileUpload = multer({
    dest: directory,
    limits: { fileSize: 5 * 1024 * 1024 },
});

export const server_routes = Router();

server_routes.use(test_routes);
