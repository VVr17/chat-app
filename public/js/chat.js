import {
  createChatMessageMarkup,
  createLocationMessageMarkup,
  createUserListMarkup,
} from "./createMarkup.js";
import { getQueryParams } from "./getQueryParams.js";

window.addEventListener("load", onLoad);

function onLoad() {
  // web-socket initialization on client
  const socket = io();

  // Client listeners
  form.addEventListener("submit", (event) => handleSubmit(event, socket));
  sendLocation.addEventListener("click", () => handleLocationClick(socket));

  socket.on("connect", () => {
    console.log("Connected to server");

    const params = getQueryParams(); // Gets params: "name" and "room"

    socket.emit("join", params, (err) => {
      // If there is an error, goes to the home page
      if (err) {
        alert(err);
        window.location.href = "/";
      }
    });
  });

  // Custom listener from server
  socket.on("newMessage", (data) => {
    createChatMessageMarkup(data);
  });

  socket.on("newLocationMessage", (data) => {
    createLocationMessageMarkup(data);
  });

  socket.on("updateUsersList", (users) => {
    createUserListMarkup(users);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from server");
  });
}

/**
 * Handles the form submission event, preventing the default form behavior,
 * retrieving the message from the form, and emitting a 'createMessage' socket event.
 *
 * @param {Event} event - The form submission event.
 * @param {Socket} socket - The socket connection to the server.
 */
function handleSubmit(event, socket) {
  event.preventDefault();
  const message = event.target.elements[0].value;

  // Create a custom client event with callback
  if (message) {
    socket.emit("createMessage", message, (serverMessage) => {
      console.log("Got it. ", serverMessage);
    });
  }

  event.target.reset();
}

/**
 * Handles the click event for the location button,
 * checks for geolocation support, and emits a 'createLocationMessage' socket event
 * with the user's current latitude and longitude.
 *
 * @param {Socket} socket - The socket connection to the server.
 */
function handleLocationClick(socket) {
  if (!navigator.geolocation) {
    return alert("Geolocation is not supporting by your browser.");
  }

  // Gets current geolocation
  navigator.geolocation.getCurrentPosition(handleSuccess, handleError);

  function handleSuccess(position) {
    socket.emit("createLocationMessage", {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  }

  function handleError() {
    alert("Unable to fetch location.");
  }
}
