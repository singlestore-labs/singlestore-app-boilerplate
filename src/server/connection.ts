import * as mysql from "mysql2";

export function connectSingleStore() {
    try {
        const connection = mysql.createConnection({
            host: process.env.HOST,
            password: process.env.PASSWORD,
            user: "admin",
        });

        return connection;
    } catch (error) {
        console.error(error);
    }
}

export async function createDatabase({
    connection,
    database,
}: {
    connection: mysql.Connection;
    database: string;
}) {
    connection.query(`CREATE DATABASE IF NOT EXISTS ${database}`);
}

export function stopSingleStore(connection: mysql.Connection) {
    connection.end();
}
