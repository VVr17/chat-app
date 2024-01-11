window.addEventListener("load", onLoad);

function onLoad() {
  // web-socket initialization on client
  const socket = io();

  socket.on("connect", () => {
    console.log("Connected to server");
  });

  // Custom listener from server
  socket.on("welcomeMessage", (message) => {
    console.log("<--", message);
  });

  socket.on("newMessage", (message) => {
    console.log("<--", message);
  });

  // Create a custom client event
  socket.emit("createMessage", { from: "Client", text: "What is going on?" });

  socket.on("disconnect", () => {
    console.log("Disconnected from server");
  });
}
