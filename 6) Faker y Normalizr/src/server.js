const express = require("express");
const hbs = require("express-handlebars");
const {faker} = require("@faker-js/faker");
const http = require("http");
const { Server: SocketServer } = require("socket.io");
const { MessagesMongoDAO } = require("../persistencia/daos/messagesMongoDAO.js");
const { log } = require("console");
const { connectMongoDB } = require("../persistencia/dbConfigMongo.js");
const { schema, normalize } = require("normalizr");
const { inspect } = require("util");
const { json } = require("express");


const app = express();
const httpServer = http.createServer(app);
const socketServer = new SocketServer(httpServer);
const dbMessage = new MessagesMongoDAO();

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

const randomProducts = (cant) => {
  const arrayProducts = [];
  for (let i = 1; i <=  cant; i++) {
    arrayProducts.push({
      name: faker.commerce.product(),
      price:faker.commerce.price(1, 2000, 2),
      urlPhoto:faker.image.food( 640, 480,true)
    });
  }
  return arrayProducts;
}
app.get("/api/products-test",(req,res)=>{
  res.json({products : randomProducts(5)});
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/message", (req, res) => {

  dbMessage.getAll().then(resp=> {
    res.json({mensajes:resp})
  });
});
socketServer.on('connection', (client) => {
    // console.log("Usuario conectado:", client.id);

    dbMessage.getAll().then(listMessages => socketServer.emit("loadMessages",listMessages));
    
    client.on("message", (message) => {
        dbMessage.save(message).then((res)=>{
          console.log(res);
          dbMessage.getAll().then(listMessages => socketServer.sockets.emit("loadMessages",listMessages));
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

app.get("/responseMessage",(req,res)=>{
  dbMessage.getByNormalize();
  res.json({text:"dada"});
});