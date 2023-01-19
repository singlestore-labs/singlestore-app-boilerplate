import * as express from "express";
import { connectSingleStore } from "./connection";
const bodyParser = require("body-parser");

const app = express();
const router = express.Router();

router.get("/api/hello", (req, res, next) => {
    res.json("SingleStore");
});

router.post("/setup", bodyParser.json(), (req, res, next) => {
    console.log("//setup on the boilerplate side//", { req: req.body });

    process.env.HOST = req.body.hostname;
    process.env.PASSWORD = req.body.password;

    connectSingleStore("todo");

    res.json("/SETUP!");
});

export default router;
