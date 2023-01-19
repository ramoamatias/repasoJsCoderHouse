const { Router } = require("express");
const { home, routeNotFound } = require("../controller/homeController.js");
const { isAuth } = require("../controller/userController.js");

const homeRouter = Router();

homeRouter.get("/", isAuth, home);

homeRouter.get("/*", routeNotFound);

module.exports = {
  homeRouter,
};
