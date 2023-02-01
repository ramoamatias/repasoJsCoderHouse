const socketClient = io();
const $formSubmitProduct = document.getElementById("submitProduct");
const $tableProducts = document.getElementById("tableProducts");

const $formChat = document.getElementById("formChat");
const $messageUser = document.getElementById("messageUser");
const $listMessages = document.getElementById("listMessages");

$formSubmitProduct.addEventListener("submit",e =>{
    socketClient.emit("updateProducts");
})

socketClient.on("loadProducts",listProducts => {
    let content  = `
    <tr class="table-primary">
         <th class="h3">Name</th>
         <th class="h3">Price</th>
         <th class="h3">Photo</th>
    </tr>`;
    listProducts.forEach(product => {
        content += `
        <tr>
            <td class="h4">${product.name}</td>
            <td class="h4">$${product.price}</td>
            <td><img src=${product.urlPhoto} alt=${product.name}$ style="width:50px ;"></td>
        </tr>`
    });
    
    $tableProducts.innerHTML = content;
})

$formChat.addEventListener("submit",e => {
    e.preventDefault();
    
    const text = $messageUser.value;
    const today = new Date();
    const time = today.toLocaleString();
    const data = { text, time }

    if (text) {
        socketClient.emit("message", data);
    }
    $messageUser.value = "";
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
        bottom: 0,
        behavior: 'smooth'
    });

    
})
