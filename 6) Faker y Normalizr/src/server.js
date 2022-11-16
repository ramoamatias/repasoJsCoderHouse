const express = require("express");
const hbs = require("express-handlebars");
const http = require("http");
const { Server: SocketServer } = require("socket.io");
const { connectMongoDB } = require("../persistencia/dbConfigMongo.js");
const { MessagesMongoDAO } = require("../persistencia/daos/messagesMongoDAO.js");
const { ProductsMongoDAO } = require("../persistencia/daos/productsMongoDAO.js");

const app = express();
const httpServer = http.createServer(app);
const socketServer = new SocketServer(httpServer);
const dbMessage = new MessagesMongoDAO();
const dbProducts = new ProductsMongoDAO();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.engine("hbs",hbs.engine({
    partialsDir: __dirname + "/views/partials",
    layoutsDir: __dirname + "/views/layouts",
    extname: ".hbs",
    defaultLayout: "layoutIndex.hbs",
  })
);

app.set("views", "./views");
app.set("view engine", "hbs");

app.get("/api/products-test",(req,res)=>{
  res.json({products : dbProducts.randomProducts(5)});
});

app.get("/", (req, res) => {
  res.render("index");
});

socketServer.on('connection', (client) => {

    dbMessage.getByNormalize().then(listMessages => socketServer.emit("loadMessages",listMessages));
    
    client.on("message", (message) => {
        dbMessage.save(message).then((res)=>{
          console.log(res);
          dbMessage.getByNormalize().then(listMessages => {console.log("Load mensajes"); ;socketServer.sockets.emit("loadMessages",listMessages);});
        })
    });
});

const PORT = process.env.PORT || 8081;
try {
  connectMongoDB();
  console.log("Conectado a la Base de Datos Mongo");
  httpServer.listen(PORT, () => {
    console.log(`Escuchando el puerto ${PORT}`);
    console.log(`http://localhost:${PORT}`);
  });
} catch (error) {
  console.log(error);
}
