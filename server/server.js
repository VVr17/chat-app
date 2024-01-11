import path from "path";
import http from "http";
import * as dotenv from "dotenv";
import express from "express";
import { Server } from "socket.io";

import {
  generateLocationMessage,
  generateMessage,
} from "./utils/generateMessage.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;
const publicPath = path.join(path.resolve(), "/public");

app.use(express.static(publicPath));

io.on("connection", (socket) => {
  console.log("A new user just connected");

  // Create custom server event to the new user
  socket.emit(
    "newMessage",
    generateMessage("Admin", "Welcome to the chat app")
  );

  // Create a broadcasting event for everybody else but new user
  socket.broadcast.emit(
    "newMessage",
    generateMessage("Admin", "New user joined the chat")
  );

  // Custom listener from user
  socket.on("createMessage", ({ from, text }, callback) => {
    // Create a server custom event for all connected
    io.emit("newMessage", generateMessage(from, text));

    if (callback) callback("This is Server"); // Acknowledgement
  });

  socket.on("createLocationMessage", ({ from, lat, lng }) => {
    io.emit("newLocationMessage", generateLocationMessage(from, { lat, lng }));
  });

  socket.on("disconnect", () => {
    console.log("User was disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
