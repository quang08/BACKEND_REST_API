import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "compression";
import mongoose from "mongoose";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression()); //use to reduce the size of the response body before it is sent to the client
app.use(cookieParser()); //makes the cookie sent by client avaiable in req.cookies object
app.use(bodyParser.json()); //since the request can be full of different formats, we have to parse it before it's sent to the server, so that when we receive (req.body) it we can manipulate the parsed data

const server = http.createServer(app);
//create an HTTP server that will handle incoming requests and delegate them to your Express application for further processing. This allows your Express application to handle HTTP requests and responses.

server.listen(8080, () => {
  console.log("Server is listening on port 8080");
});

const MONGO_URL =
  "mongodb+srv://quang:08022003@cluster0.qundruj.mongodb.net/?retryWrites=true&w=majority";

mongoose.Promise = Promise; //so we can chain then() catch() with the promises returned by mongoose
mongoose.connect(MONGO_URL); //connect to the database
mongoose.connection.on("error", (err) => {
  console.error("MongoDB error", err);
});
