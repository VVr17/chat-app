// Modules and libraries
import path from "path";
import http from "http";
import * as dotenv from "dotenv";
import express from "express";
import { Server } from "socket.io";

// Utility functions and classes
import {
  generateLocationMessage,
  generateMessage,
} from "./utils/generateMessage.js";
import { isRealString } from "./utils/isRealString.js";
import { Users } from "./utils/users.js";

dotenv.config(); // Configuring environment variables

// Setting up the Express application and creating an HTTP server
const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000; // Setting the port number from environment variable or using a default value
const publicPath = path.join(path.resolve(), "/public"); // Defining the path to the public directory
let users = new Users(); // Creating an instance of the Users class to manage user information

app.use(express.static(publicPath)); // Serving static files from the public directory

// Handling socket.io connections
io.on("connection", (socket) => {
  console.log("A new user just connected");

  //  Listener on "Join" client event
  socket.on("join", (params, callback) => {
    // If there is no room or name entered, calls callback and goes to the home page
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback("Name and room are required");
    }

    socket.join(params.room); // User joins a specified room.
    users.removeUser(socket.id); // Once user joined room, remove him from any previous rooms
    users.addUser(socket.id, params.name, params.room); // Adds a new user to the specified room

    // Emit server event to everybody in the specified room to update the users list
    io.to(params.room).emit(
      "updateUsersList",
      users.getUsersByRoom(params.room)
    );

    // Create custom server event "Welcome message" to the new user
    socket.emit(
      "newMessage",
      generateMessage("Admin", `Welcome to ${params.room} room!`)
    );

    // Create a broadcasting event "Welcome message" for specified room only (except new user)
    socket.broadcast
      .to(params.room)
      .emit("newMessage", generateMessage("Admin", "New User Joined!"));

    callback();
  });

  // Custom listener from user for creating regular messages
  socket.on("createMessage", (message, callback) => {
    const user = users.getUserById(socket.id);

    // Create a server custom event for users in specified room
    if (user && isRealString(message)) {
      io.to(user.room).emit("newMessage", generateMessage(user.name, message));
    }

    if (callback) callback("This is Server"); // Acknowledgement
  });

  // Custom listener from user for creating location-based messages
  socket.on("createLocationMessage", ({ lat, lng }) => {
    const user = users.getUserById(socket.id);

    // Create a server custom event for users in specified room
    if (user) {
      io.to(user.room).emit(
        "newLocationMessage",
        generateLocationMessage(user.name, { lat, lng })
      );
    }
  });

  // Handling the "disconnect" event when a user disconnects
  socket.on("disconnect", () => {
    console.log("User was disconnected");
    const user = users.removeUser(socket.id);

    // If user has been removed, update users list and emit event for all in the specified room
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

/**
 * Create a broadcasting event for everybody else but new user
  socket.broadcast.emit(
  "newMessage",
  generateMessage("Admin", "New user joined the chat")
  );
 */

/**
 * Create a server custom event for all users
  socket.on("createLocationMessage", ({ from, lat, lng }) => {
  io.emit("newLocationMessage", generateLocationMessage(from, { lat, lng }));
  });
*/
