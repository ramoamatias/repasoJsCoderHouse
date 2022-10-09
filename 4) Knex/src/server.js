const express = require("express");
const hbs = require("express-handlebars");
const http = require("http");
const { Server: SocketServer } = require("socket.io");
require("../db/models/messages.js");
require("../db/models/products.js");

const {config} = require("../db/dbConfig.js");
const productsRouter = require("../routes/products.js");
const Container = require("./js/ContenedorKnex.js");

const app = express();
const httpServer = http.createServer(app);
const socketServer = new SocketServer(httpServer);
const dbMessage = new Container(config,"messages");
const dbProducts = new Container(config,"products");

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
  dbProducts.getAll().then(arrayProducts => {res.render("index",{isProducts : arrayProducts.length > 0 , arrayProducts})});
});

socketServer.on('connection', (client) => {
    console.log("Usuario conectado:", client.id);
    client.on("updateProducts", () => {
     setTimeout(() => {
      dbProducts.getAll().then(listMessages => socketServer.sockets.emit("loadProducts",listMessages));
     }, 1000); 
    });

    dbMessage.getAll().then(listMessages => socketServer.emit("loadMessages",listMessages));
    
    client.on("message", (message) => {
        dbMessage.save(message).then(()=>{
          dbMessage.getAll().then(listMessages => socketServer.sockets.emit("loadMessages",listMessages));
        })
    });
});

const PORT = process.env.PORT || 8081;
httpServer.listen(PORT, () => {
  console.log(`Escuchando el puerto ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
