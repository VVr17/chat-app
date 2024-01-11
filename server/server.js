import path from "path";
import http from "http";
import * as dotenv from "dotenv";
import express from "express";
import { Server } from "socket.io";

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
  socket.emit("welcomeMessage", {
    from: "Admin",
    text: "Welcome to the chat app",
    createdAt: new Date().getTime(),
  });

  // Create a broadcasting event for everybody else but new user
  socket.broadcast.emit("welcomeMessage", {
    from: "Admin",
    text: "New user joined",
    createdAt: new Date().getTime(),
  });

  // Custom listener from user
  socket.on("createMessage", (data) => {
    console.log("Create message", data);

    // Create a server custom event for all connected
    io.emit("newMessage", {
      from: data.from,
      text: data.text,
      createdAt: new Date().getTime(),
    });
  });

  socket.on("disconnect", () => {
    console.log("User was disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
