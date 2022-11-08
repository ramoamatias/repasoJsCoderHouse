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
        id : $email.value, 
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

    if (author.id && text) {
        socketClient.emit("message", data);
    }
    $messageUser.value = "";
    $formData.style.display = "none";
});

socketClient.on("loadMessages",listMessages => {

    const chats = listMessages.map((message) => {
        return `    <li>
                        <div class="mensajeContainer">
                            <div class="nick">
                                <span style="color: blue">${message.user}</span> <span style="color: brown">[${message.time}]:</span><span style="color: green">${message.message}</span>
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
