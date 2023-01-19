import mysql from "mysql2/promise";

export async function connectSingleStore(databaseName) {
    let connection;

    try {
        connection = await mysql
            .createConnection({
                host: process.env.HOST,
                password: process.env.PASSWORD,
                user: "admin",
            })
            .then((conn) => {
                conn.query(`CREATE DATABASE IF NOT EXISTS ${databaseName}`);
            });
    } catch (error) {
        console.error(error);
    }
}
