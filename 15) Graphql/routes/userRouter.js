const { Router } = require("express");
const passport = require("passport");

const { UserController } = require("../controller/userController.js");

let userRouter = Router();

class UserRouter {
  constructor() {
    this.userController = new UserController();
  }

  init() {
    userRouter.post(
      "/login",
      passport.authenticate("login", {
        failureRedirect: "/user/errorLogin",
        successRedirect: "/",
      })
    );

    userRouter.get("/register", this.userController.registerGet);

    userRouter.post(
      "/register",
      passport.authenticate("register", {
        failureRedirect: "/user/errorRegister",
        successRedirect: "/",
      })
    );

    userRouter.get("/errorRegister", this.userController.errorRegister);

    userRouter.get("/errorLogin", this.userController.errorLogin);

    userRouter.get(
      "/logout",
      this.userController.isAuth,
      this.userController.logout
    );

    return userRouter;
  }
}
module.exports = { UserRouter };
