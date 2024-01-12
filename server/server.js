import path from "path";
import http from "http";
import * as dotenv from "dotenv";
import express from "express";
import { Server } from "socket.io";

import {
  generateLocationMessage,
  generateMessage,
} from "./utils/generateMessage.js";
import { isRealString } from "./utils/isRealString.js";
import { Users } from "./utils/users.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;
const publicPath = path.join(path.resolve(), "/public");
let users = new Users();

app.use(express.static(publicPath));

io.on("connection", (socket) => {
  console.log("A new user just connected");

  socket.on("join", (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback("Name and room are required");
    }

    socket.join(params.room); // User joins a specified room.
    users.removeUser(socket.id); // Once user joined room, kick him out from chat / any rooms he had been before in
    users.addUser(socket.id, params.name, params.room); // Add a new user to specified room

    // Emit server event to everybody in the specified room
    io.to(params.room).emit(
      "updateUsersList",
      users.getUsersByRoom(params.room)
    );

    // Create custom server event to the new user
    socket.emit(
      "newMessage",
      generateMessage("Admin", `Welcome to ${params.room}!`)
    );

    // Create a broadcasting event for specified room only (except new user)
    socket.broadcast
      .to(params.room)
      .emit("newMessage", generateMessage("Admin", "New User Joined!"));

    callback();
  });

  // Custom listener from user
  socket.on("createMessage", (message, callback) => {
    const user = users.getUser(socket.id);

    // Create a server custom event for users in specified room
    if (user && isRealString(message)) {
      io.to(user.room).emit("newMessage", generateMessage(user.name, message));
    }

    if (callback) callback("This is Server"); // Acknowledgement
  });

  socket.on("createLocationMessage", ({ lat, lng }) => {
    const user = users.getUser(socket.id);

    // Create a server custom event for users in specified room
    if (user) {
      io.to(user.room).emit(
        "newLocationMessage",
        generateLocationMessage(user.name, { lat, lng })
      );
    }
  });

  socket.on("disconnect", () => {
    console.log("User was disconnected");
    const user = users.removeUser(socket.id);

    // if user has been removed, update users list and emit event for all in the specified room
    if (user) {
      io.to(user.room).emit("updateUsersList", users.getUsersByRoom(user.room));
      io.to(user.room).emit(
        "newMessage",
        generateMessage(
          "Admin",
          `User ${user.name} has left ${user.room} chat room.`
        )
      );
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});

// Create a broadcasting event for everybody else but new user
// socket.broadcast.emit(
//   "newMessage",
//   generateMessage("Admin", "New user joined the chat")
// );

// Create a server custom event for all users
// socket.on("createLocationMessage", ({ from, lat, lng }) => {
//   io.emit("newLocationMessage", generateLocationMessage(from, { lat, lng }));
// });
