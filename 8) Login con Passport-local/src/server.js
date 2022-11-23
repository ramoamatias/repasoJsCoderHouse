const express = require("express");
const hbs = require("express-handlebars");
const http = require("http");
const { Server: SocketServer } = require("socket.io");
const { connectMongoDB } = require("../persistencia/dbConfigMongo.js");
const {
  MessagesMongoDAO,
} = require("../persistencia/daos/messagesMongoDAO.js");
const {
  ProductsMongoDAO,
} = require("../persistencia/daos/productsMongoDAO.js");


const session = require("express-session");
const MongoStore = require("connect-mongo");

const productsRouter = require("../routes/productsRoutes.js");
const { router: userRouter, isAuth } = require("../routes/userRoutes.js");

const app = express();
const httpServer = http.createServer(app);
const socketServer = new SocketServer(httpServer);
const dbMessage = new MessagesMongoDAO();
const dbProducts = new ProductsMongoDAO();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use("/products", productsRouter);
app.use("/user", userRouter);

app.use(session({
  secret: "ClaveSecreta123",
  resave: true,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl:
      "mongodb+srv://matiasramoa:coderhouse@coderhouse.ocw4cfm.mongodb.net/passportLocal",
  }),
  cookie: { maxAge: 60000 * 10 },
}));

// const sharedsession = require("express-socket.io-session");

// socketServer.use(sharedsession(sess));

const passport = require("passport");
require("../passport/localPassport.js");
app.use(passport.initialize());
app.use(passport.session());

app.engine(
  "hbs",
  hbs.engine({
    partialsDir: __dirname + "/views/partials",
    layoutsDir: __dirname + "/views/layouts",
    extname: ".hbs",
    defaultLayout: "layoutIndex.hbs",
  })
  );
  
  app.set("views", "./views");
  app.set("view engine", "hbs");
  
app.get("/", isAuth, (req, res) => {
  dbProducts.getAll().then((arrayProducts) => {
    const array = {
      products: arrayProducts.map((document) => {
        return {
          name: document.name,
          price: document.price,
          urlPhoto: document.urlPhoto,
        };
      }),
    };
    
    res.render("index.hbs", {
      isProducts: array.products.length > 0,
      arrayProducts: array.products,
      user: req.user.firstName,
      imgRute: req.user.avatar,
    });
  });
});


socketServer.on("connection", (client) => {
  // console.log(client.handshake);
  // client.on("updateProducts", () => {
  //   setTimeout(() => {
  //     dbProducts
  //       .getAll()
  //       .then((listMessages) =>
  //       socketServer.sockets.emit("loadProducts", listMessages)
  //       );
  //   }, 1000);
  // });

  // dbMessage
  //   .getByNormalize()
  //   .then((listMessages) => socketServer.emit("loadMessages", listMessages));

  // client.on("message", (message) => {
  //   const { email, firstName, lastName, age, avatar, alias } =
  //     client.handshake.session;

  //   // console.log(client.handshake);
  //   message.author = { email, firstName, lastName, age, avatar, alias };
  //   dbMessage.save(message).then(() => {
  //     dbMessage.getByNormalize().then((listMessages) => {
  //       socketServer.sockets.emit("loadMessages", listMessages);
  //     });
  //   });
  // });
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
