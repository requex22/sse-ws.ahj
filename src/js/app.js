const nameForm = document.forms.inputName;
const nameFormInpt = nameForm.querySelector("input");
const nameFormBtn = nameForm.querySelector("button");

const messageForm = document.forms.messageForm;
const messageFormInpt = messageForm.querySelector("textarea");
const messageFormBtn = messageForm.querySelector("button");

const usersContainer = document.querySelector(".users");
const messages = document.querySelector(".messages");
const messenger = document.querySelector(".messenger");

let currentUser;

nameFormBtn.onclick = (e) => {
  e.preventDefault();

  if (nameFormInpt.value !== "") {
    nameFormInpt.classList.remove("invalid-name");
    ws.send(
      JSON.stringify({ method: "createNewUser", name: nameFormInpt.value })
    );
    ws.addEventListener("message", () => {
      nameForm.parentElement.style.display = "none";
      messenger.style.display = "flex";
      currentUser = nameFormInpt.value;
    });

    ws.send(JSON.stringify({ method: "getAllMessages" }));
  } else {
    nameFormInpt.classList.add("invalid-name");
  }
};

messageFormBtn.onclick = (e) => {
  e.preventDefault();

  if (messageFormInpt.value !== "") {
    ws.send(
      JSON.stringify({
        method: "createNewMessage",
        author: currentUser,
        text: messageFormInpt.value,
      })
    );
    messageFormInpt.value = "";
  }
};

const ws = new WebSocket("ws://ahj-homework8-server.herokuapp.com/ws");

ws.addEventListener("open", () => {
  ws.addEventListener("message", (msg) => {
    ws.send(JSON.stringify({ method: "getAllMessages" }));

    const data = JSON.parse(msg.data);

    data.forEach((item) => {
      if (!item.text) {
        usersContainer.innerHTML = "";
        drawUser(data);
      } else {
        messages.innerHTML = "";
        drawMessage(data);
      }
    });
  });
});

function drawUser(data) {
  data.forEach((item) => {
    usersContainer.insertAdjacentHTML(
      "beforeend",
      `
        <div class="user-card">
            <div class="img-container"></div>
            <p class="name">${item.name}</p>
        </div>
        `
    );
  });
}

function drawMessage(data) {
  data.forEach((item) => {
    messages.insertAdjacentHTML(
      "beforeend",
      `
        <div class="message ${item.autor == currentUser ? "my-message" : ""}">
            <div class="message-info">
                <span class="author">${
                  item.autor == currentUser ? "You" : item.autor
                }</span>
                <span class="date">${item.createData}</span>
            </div>
            <p class="message-text">${item.text}</p>
        </div>
        `
    );
  });
}
