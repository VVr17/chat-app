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
  messagesList.appendChild(li);

  // window.scrollTo(0, document.body.scrollHeight);
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
  messagesList.appendChild(li);

  // window.scrollTo(0, document.body.scrollHeight);
};
