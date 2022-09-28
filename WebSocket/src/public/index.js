const socketClient = io();
const $formChat = document.getElementById("formChat");
const $emailUser = document.getElementById('emailUser');
const $messageUser = document.getElementById("messageUser");
const $formSubmitProduct = document.getElementById("submitProduct");
const $tableProducts = document.getElementById("tableProducts");
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
    const user = $emailUser.value;
    const message = $messageUser.value;
    const today = new Date();
    const time = today.toLocaleString();
    const data = { user, message, time }

    socketClient.emit("message", data);
    $messageUser.value = "";
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
