const { Router } = require("express");
const { HomeController } = require("../controller/homeController.js");
const { UserController } = require("../controller/userController.js");

const homeRouter = Router();

class HomeRouter {
  constructor() {
    this.homeController = new HomeController();
    this.userController = new UserController();
  }

  init() {
    homeRouter.get(
      "/",
      this.userController.isAuth,
      this.homeController.home
    );
    homeRouter.get("/*", this.homeController.routeNotFound);

    return homeRouter;
  }
}

module.exports = {
  HomeRouter,
};
