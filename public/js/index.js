import { createChatItem, createLocationItem } from "./createMessageItem.js";

window.addEventListener("load", onLoad);

function onLoad() {
  // Ask user for a name
  const username = prompt(`What is you name?`, "Anonym");

  // Client listeners
  form.addEventListener("submit", handleSubmit);
  sendLocation.addEventListener("click", handleLocationClick);

  // web-socket initialization on client
  const socket = io();

  socket.on("connect", () => {
    console.log("Connected to server");
  });

  // Custom listener from server
  socket.on("newMessage", (message) => {
    console.log("<--", message);
  });

  socket.on("newMessage", (data) => {
    createChatItem(data);
  });

  socket.on("newLocationMessage", (data) => {
    createLocationItem(data);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from server");
  });

  function handleSubmit(event) {
    event.preventDefault();
    const message = event.target.elements[0].value;

    // Create a custom client event
    if (message) {
      socket.emit(
        "createMessage",
        { from: username, text: message },
        (serverMessage) => {
          console.log("Got it. ", serverMessage);
        }
      );
    }

    event.target.reset();
  }

  function handleLocationClick(event) {
    if (!navigator.geolocation) {
      return alert("Geolocation is not supporting by your browser.");
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("position.coords", position.coords);
        socket.emit("createLocationMessage", {
          from: username,
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        alert("Unable to fetch location.");
      }
    );
  }
}
