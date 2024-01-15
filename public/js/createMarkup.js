/**
 * Scrolls to the bottom of the messages list.
 */
export const scrollToBottom = () => {
  messagesList.lastElementChild.scrollIntoView();
};

/**
 * Creates chat message markup and appends it to the messages list.
 * 
 * @param {Object} message - The chat message object.
 * @param {string} message.from - The sender's name.
 * @param {string} message.text - The message text.
 * @param {string} message.createdAt - The timestamp of the message creation.
 */
export const createChatMessageMarkup = ({ from, text, createdAt }) => {
  const template = document.querySelector("#message-template").innerHTML;

  const formattedTime = moment(createdAt).format("LTS");
  const html = Mustache.render(template, {
    from,
    text,
    createdAt: formattedTime,
  });

  messagesList.insertAdjacentHTML("beforeend", html);

  scrollToBottom();
};

/**
 * Creates location message markup and appends it to the messages list.
 * 
 * @param {Object} locationMessage - The location message object.
 * @param {string} locationMessage.from - The sender's name.
 * @param {string} locationMessage.url - The location URL.
 * @param {string} locationMessage.createdAt - The timestamp of the message creation.
 */
export const createLocationMessageMarkup = ({ from, url, createdAt }) => {
  const template = document.querySelector(
    "#location-message-template"
  ).innerHTML;
  const formattedTime = moment(createdAt).format("LTS");
  const html = Mustache.render(template, {
    from,
    url,
    createdAt: formattedTime,
  });

  messagesList.insertAdjacentHTML("beforeend", html);

  scrollToBottom();
};

/**
 * Creates user list markup and replaces the existing user list with the new markup.
 * 
 * @param {Array} users - An array of user names.
 */
export const createUserListMarkup = (users) => {
  const usersMarkup = users.map((user) => `<li>${user}</li>`).join("");

  usersList.innerHTML = "";
  usersList.insertAdjacentHTML("beforeend", usersMarkup);
};
