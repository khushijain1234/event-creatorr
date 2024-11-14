import multer from "multer";
import { Router } from "express";

import { MONTHS } from "../config/index.js";
import { test_routes } from "./test-routes.js";

const directory =
    "./" +
    `public/images/${new Date().getUTCFullYear()}/${
        MONTHS[new Date().getMonth()]
    }`;

export const server_routes = Router();
const fileUpload = multer({
    dest: directory,
    limits: { fileSize: 5 * 1024 * 1024 },
});

server_routes.use(test_routes);
