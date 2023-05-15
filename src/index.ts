import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "compression";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression()); //use to reduce the size of the response body before it is sent to the client
app.use(cookieParser());
app.use(bodyParser.json()); //since the request can be full of different formats, we have to parse it before it's sent to the server, so that when we receive (req.body) it we can manipulate the parsed data

const server = http.createServer(app);
//create an HTTP server that will handle incoming requests and delegate them to your Express application for further processing. This allows your Express application to handle HTTP requests and responses.

server.listen(8080, () => {
    console.log("Server is listening on port 8080");
})