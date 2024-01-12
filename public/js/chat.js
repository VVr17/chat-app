import {
  createChatItem,
  createLocationItem,
  createUserItem,
} from "./createMarkup.js";

window.addEventListener("load", onLoad);

function onLoad() {
  // Client listeners
  form.addEventListener("submit", handleSubmit);
  sendLocation.addEventListener("click", handleLocationClick);

  // web-socket initialization on client
  const socket = io();

  socket.on("connect", () => {
    console.log("Connected to server");

    // Get params: "name" and "room"
    const searchQuery = window.location.search.substring(1);
    const params = JSON.parse(
      '{"' +
        decodeURI(searchQuery)
          .replace(/&/g, '","')
          .replace(/\+/g, " ")
          .replace(/=/g, '":"') +
        '"}'
    );

    socket.emit("join", params, (err) => {
      if (err) {
        alert(err);
        window.location.href = "/";
      } else {
        console.log("No Error");
      }
    });
  });

  // Custom listener from server
  socket.on("newMessage", (data) => {
    createChatItem(data);
  });

  socket.on("newLocationMessage", (data) => {
    createLocationItem(data);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from server");
  });

  socket.on("updateUsersList", (users) => {
    createUserItem(users);
  });

  function handleSubmit(event) {
    event.preventDefault();
    const message = event.target.elements[0].value;

    // Create a custom client event
    if (message) {
      socket.emit("createMessage", message, (serverMessage) => {
        console.log("Got it. ", serverMessage);
      });
    }

    event.target.reset();
  }

  function handleLocationClick(event) {
    if (!navigator.geolocation) {
      return alert("Geolocation is not supporting by your browser.");
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        socket.emit("createLocationMessage", {
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
