import express from "express";
import next from "next";
import "dotenv/config";

const PORT = parseInt(process.env.PORT);
const HOST = process.env.HOST 

console.log(HOST)
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

// prepare app
app.prepare().then(() => {
    const server = express();
    server.get("*", (req, res) => {
        return handle(req, res)
    })

    server.listen(PORT, (error) => {
        if(error) throw error;
        console.log(`> Client listening on ${HOST}:${PORT}`)
    })
})

