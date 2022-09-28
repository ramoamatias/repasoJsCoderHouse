const express = require("express");
const hbs = require("express-handlebars");
const fs = require("fs");
const http = require("http");
const app = express();

const { Server: SocketServer } = require("socket.io");
const httpServer = http.createServer(app);
const socketServer = new SocketServer(httpServer);
const productsRouter = require("../routes/products");
const Contenedor =  require("../../Contenedor");

const fileMessage = new Contenedor("./files/messages.txt");
const fileProducts = new Contenedor("./files/products.txt");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use("/products", productsRouter);

app.engine("hbs",hbs.engine({
    partialsDir: __dirname + "/views/partials",
    layoutsDir: __dirname + "/views/layouts",
    extname: ".hbs",
    defaultLayout: "layoutIndex.hbs",
  })
);

app.set("views", "./views");
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  fileProducts.getAll().then(arrayProducts => {res.render("index",{isProducts : arrayProducts.length > 0 , arrayProducts})});
});

socketServer.on('connection', (client) => {
    console.log("Usuario conectado:", client.id);
    client.on("updateProducts", () => {
     setTimeout(() => {
      fileProducts.getAll().then(listMessages => socketServer.sockets.emit("loadProducts",listMessages));
     }, 1000); 
    });

    fileMessage.getAll().then(listMessages => socketServer.emit("loadMessages",listMessages));
    
    client.on("message", (message) => {
        fileMessage.save(message).then(()=>{
          fileMessage.getAll().then(listMessages => socketServer.sockets.emit("loadMessages",listMessages));
        })
    });
});








const PORT = process.env.PORT || 8081;
httpServer.listen(PORT, () => {
  console.log(`Escuchando el puerto ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
