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
const { UsersMongoDAO } = require("../persistencia/daos/usersMongoDAO.js");

const session = require("express-session");
const MongoStore = require("connect-mongo");

const productsRouter = require("../routes/products.js");

const app = express();
const httpServer = http.createServer(app);
const socketServer = new SocketServer(httpServer);
const dbMessage = new MessagesMongoDAO();
const dbProducts = new ProductsMongoDAO();
const dbUsers = new UsersMongoDAO();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use("/products", productsRouter);
const sess = session({
  secret: "ClaveSecreta123",
  resave: true,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl:
      "mongodb+srv://matiasramoa:coderhouse@coderhouse.ocw4cfm.mongodb.net/session",
  }),
  cookie: { maxAge: 60000 * 10 },
});
app.use(sess);

const sharedsession = require("express-socket.io-session");

socketServer.use(sharedsession(sess));

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

let datosUsuarios;

app.get("/", (req, res) => {
  datosUsuarios = req.session;
  console.log(datosUsuarios);
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

    res.render("index", {
      isProducts: array.products.length > 0,
      arrayProducts: array.products,
      user: req.session.firstName,
      imgRute: req.session.avatar,
    });
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await dbUsers.getByFilter({ email, password });
  console.log(user);
  if (user.length > 0) {
    datosUsuarios = req.session;
    const userData = user[0];
    req.session.email = userData.email;
    req.session.firstName = userData.firstName;
    req.session.lastName = userData.lastName;
    req.session.age = userData.age;
    req.session.avatar = userData.avatar;
    req.session.alias = userData.alias;
    req.session.password = userData.email;
    console.log(datosUsuarios);
    res.redirect("/");
  } else {
    res.send("Error usuario o contrasñea no existe");
  }
});

app.get("/register", (req, res) => {
  res.render("registerPage");
});

app.post("/register", (req, res) => {
  dbUsers.save(req.body).then(() => {
    for (const key in req.body) {
      req.session[key] = req.body[key];
    }
    res.redirect("/");
  });
});

app.get("/logout", (req, res) => {
  const userLogout = req.session.firstName;
  req.session.destroy((err) => {
    if (!err) {
      res.render("logoutPage", { user: userLogout });
    }
  });
});

socketServer.on("connection", (client) => {
  console.log(client.handshake);
  client.on("updateProducts", () => {
    setTimeout(() => {
      dbProducts
        .getAll()
        .then((listMessages) =>
          socketServer.sockets.emit("loadProducts", listMessages)
        );
    }, 1000);
  });

  dbMessage
    .getByNormalize()
    .then((listMessages) => socketServer.emit("loadMessages", listMessages));

  client.on("message", (message) => {
    const { email, firstName, lastName, age, avatar, alias } =
      client.handshake.session;
    message.author = { email, firstName, lastName, age, avatar, alias };
    dbMessage.save(message).then(() => {
      dbMessage.getByNormalize().then((listMessages) => {
        socketServer.sockets.emit("loadMessages", listMessages);
      });
    });
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
