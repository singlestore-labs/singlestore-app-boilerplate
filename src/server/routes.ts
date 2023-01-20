import * as express from "express";
import {
    connectSingleStore,
    createDatabase,
    createTable,
    deleteDatabase,
    getDatabases,
    insertTable,
    selectTable,
    stopSingleStore,
} from "./connection";
const bodyParser = require("body-parser");

const app = express();
const router = express.Router();

router.get("/api/hello", (req, res, next) => {
    res.json("SingleStore");
});

router.post("/setup", bodyParser.json(), async (req, res, next) => {
    console.log("//setup on the boilerplate side//", { req: req.body });

    process.env.HOST = req.body.hostname;
    process.env.PASSWORD = req.body.password;

    const connection = await connectSingleStore();
    if (connection) {
        createDatabase({ conn: connection, database: "todo" });
        stopSingleStore(connection);
    }

    res.json("/SETUP!");
});

router.get("/api/database", async (req, res) => {
    console.log("GET /api/database");

    const sqlRes = await getDatabases();
    res.json(sqlRes);
});

router.post("/api/database", bodyParser.json(), async (req, res) => {
    console.log("POST /api/database, body:", req.body);

    const database = req.body.database;
    const sqlRes = await createDatabase({ database });
    res.json(sqlRes);
});

router.delete("/api/database", bodyParser.json(), async (req, res) => {
    console.log("DELETE /api/database, body:", req.body);

    const database = req.body.database;
    const sqlRes = await deleteDatabase({ database });
    res.json(sqlRes);
});

router.get("/api/database/:database/table/:table", async (req, res) => {
    const database = req.params.database;
    const table = req.params.table;
    console.log(`GET /api/database/${database}/table/${table}`);

    const sqlRes = await selectTable({ database, table });
    res.json(sqlRes);
});

router.post(
    "/api/database/:database/table",
    bodyParser.json(),
    async (req, res) => {
        const database = req.params.database;
        console.log(`POST /api/database/${database}/table, body:`, req.body);

        const table = req.body.table;
        const columns = req.body.columns;
        const sqlRes = await createTable({ database, table, columns });
        res.json(sqlRes);
    }
);

router.put(
    "/api/database/:database/table",
    bodyParser.json(),
    async (req, res) => {
        const database = req.params.database;
        console.log(`PUT /api/database/${database}/table, body:`, req.body);

        const table = req.body.table;
        const columns = req.body.columns;
        const values = req.body.values;
        const sqlRes = await insertTable({ database, table, columns, values });
        res.json(sqlRes);
    }
);

export default router;
