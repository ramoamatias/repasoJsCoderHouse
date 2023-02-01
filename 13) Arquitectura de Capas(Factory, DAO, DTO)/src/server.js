const express = require("express");
const config = require("../config.js");

const hbs = require("express-handlebars");
const http = require("http");
const { Server: SocketServer } = require("socket.io");
const cluster = require("cluster");
const os = require("os");
const compression = require("compression");

const numCPUs = os.cpus().length;
// Implement Passport
const passport = require("passport");
require("../passport/localPassport.js");
const passportSocketIo = require("passport.socketio");


const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const { homeRouter } = require("../routes/homeRouter.js");
const { productsRouter } = require("../routes/productsRouter.js");
const { infoRouter } = require("../routes/infoRouter.js");
const { randomRouter } = require("../routes/randomRoutes.js");
const { userRouter } = require("../routes/userRouter.js");

const { emitProducts, save, messageNormalize } = require("../controller/socketController.js");
const { logger } = require("../services/homeServices.js");

const app = express();
const httpServer = http.createServer(app);
const socketServer = new SocketServer(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(compression());
const mongoConnection = MongoStore.create({
  mongoUrl: config.URLDBMONGO,
});

app.use(cookieParser(config.KEYSECRET));

const sessionConfig = session({
  secret: config.KEYSECRET,
  resave: true,
  saveUninitialized: true,
  store: mongoConnection,
  cookie: { maxAge: 60000 * 10 },
});
app.use(sessionConfig);

socketServer.use(
  passportSocketIo.authorize({
    secret: config.KEYSECRET,
    store: mongoConnection,
  })
);

// IMPOIRTANTE DEBE DE ESTAR ANTES DE LA DEFINICION DE LAS RUTAS
app.use(passport.initialize());
app.use(passport.session());

app.use("/products", productsRouter);
app.use("/info", infoRouter);
app.use("/api/randoms", randomRouter);
app.use("/user", userRouter);
app.use("/", homeRouter);

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

socketServer.on("connection", async (client) => {
  client.on("updateProducts", async () => {
    setTimeout(async () => {
      const listProducts = await emitProducts();
      socketServer.sockets.emit("loadProducts", listProducts);
    }, 1000);
  });

  const listMessages = await messageNormalize();
  socketServer.emit("loadMessages", listMessages);

  client.on("message", async (message) => {
    const { email, firstName, lastName, age, avatar, alias } =
      client.request.user;

    message.author = { email, firstName, lastName, age, avatar, alias };

    await save(message);
    const listMessages = await messageNormalize();
    socketServer.sockets.emit("loadMessages", listMessages);
  });
});

const PORT = config.PORT;

if (config.MODO === "cluster") {
  if (cluster.isPrimary) {
    logger.info(`Proceso maestro - ${process.pid}`);

    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on("exit", () => {
      cluster.fork();
    });
  } else {
    try {
        httpServer.listen(PORT, () => {
        logger.info(`Escuchando el puerto ${PORT} - proceso ${process.pid}`);
      });
    } catch (error) {
      logger.error(error);
    }
  }
} else {
  try {
    httpServer.listen(PORT, () => {
      logger.info(`Escuchando el puerto ${PORT}`);
      console.log(`http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error(error);
  }
}
