export const scrollToBottom = () => {
  messagesList.lastElementChild.scrollIntoView();
};

export const createChatItem = ({ from, text, createdAt }) => {
  const template = document.querySelector("#message-template").innerHTML;
  const formattedTime = moment(createdAt).format("LTS");
  const html = Mustache.render(template, {
    from,
    text,
    createdAt: formattedTime,
  });

  const li = document.createElement("li");
  li.innerHTML = html;
  li.classList.add("message");
  messagesList.appendChild(li);

  scrollToBottom();
};

export const createLocationItem = ({ from, url, createdAt }) => {
  const template = document.querySelector(
    "#location-message-template"
  ).innerHTML;
  const formattedTime = moment(createdAt).format("LTS");
  const html = Mustache.render(template, {
    from,
    url,
    createdAt: formattedTime,
  });

  const li = document.createElement("li");
  li.innerHTML = html;
  li.classList.add("message");
  messagesList.appendChild(li);

  scrollToBottom();
};

export const createUserItem = (users) => {
  const ul = document.createElement("ul");

  users.forEach((user) => {
    let li = document.createElement("li");
    li.innerHTML = user;
    ul.appendChild(li);
  });

  // users = document.querySelector("#users");
  // console.log("users", users);
  usersList.innerHTML = "";
  usersList.appendChild(ul);
};
