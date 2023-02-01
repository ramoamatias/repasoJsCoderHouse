const { Router } = require("express");
const passport = require("passport");

const {
  registerGet,
  errorRegister,
  errorLogin,
  logout,
  isAuth,
} = require("../controller/userController.js");
let userRouter = Router();

userRouter.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/user/errorLogin",
    successRedirect: "/",
  })
);

userRouter.get("/register", registerGet);

userRouter.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "/user/errorRegister",
    successRedirect: "/",
  })
);

userRouter.get("/errorRegister", errorRegister);

userRouter.get("/errorLogin", errorLogin);

userRouter.get("/logout", isAuth, logout);

module.exports = { userRouter, isAuth };
