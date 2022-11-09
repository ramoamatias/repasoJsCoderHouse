const socketClient = io();
const $formChat = document.getElementById("formChat");
const $formData = document.getElementById("formData");

const $email = document.getElementById("email");
const $firstName = document.getElementById("firstName");
const $lastName = document.getElementById("lastName");
const $age = document.getElementById("age");
const $alias = document.getElementById("alias");
const $avatar = document.getElementById("avatar");
const $messageUser = document.getElementById("messageUser");
const $listMessages = document.getElementById("listMessages");



$formChat.addEventListener("submit",e => {
    e.preventDefault();

    const author = {
        email : $email.value, 
        firstName : $firstName.value,
        lastName : $lastName.value,
        age : $age.value,
        alias : $alias.value,
        avatar : $avatar.value,
    }   
    const text = $messageUser.value;
    const today = new Date();
    const time = today.toLocaleString();
    const data = { author, text, time }

    if (author.email && text) {
        socketClient.emit("message", data);
    }
    $messageUser.value = "";
    $formData.style.display = "none";
});

const authorEntity = new normalizr.schema.Entity(
    "author",
    {},
    { idAttribute: "email" }
  );

  const messageEntity = new normalizr.schema.Entity(
    "message",
    {
      author: authorEntity,
    },
    { idAttribute: "_id" }
  );

  const messagesEntity = new normalizr.schema.Entity("messages", {
    messages: [messageEntity],
  });
socketClient.on("loadMessages",listMessages => {
    console.log(listMessages,"Lista de Mensajes Normalize");

    let result= normalizr.denormalize(listMessages.result,messagesEntity,listMessages.entities);
    console.log(JSON.stringify(listMessages).length);  
    console.log(JSON.stringify(result).length); 
  console.log("Denomalizado",result);
    const chats = result.messages.map((message) => {
        return `    <li>
                        <div class="mensajeContainer">
                            <div class="nick">
                                <span style="color: blue">${message.author.email}</span> <span style="color: brown">[${message.time}]:</span><span style="color: green">${message.text}</span> <img src="${message.author.avatar}" style="width:70px; border-radius:50px" alt="avatarUsuario ${message.author.email}">
                            </div>
                        </div>
                    </li>`;
    }).join(" ");
    $listMessages.innerHTML = chats;

    $listMessages.scroll({
        top: $listMessages.scrollTop,
        behavior: 'smooth'
    });
})
