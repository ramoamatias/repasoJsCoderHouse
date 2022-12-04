const { Router } = require("express");
const passport = require("passport");
const logger = require("../src/js/logger.js");
const { methodAndRoute } = require("../src/js/functions.js");

let router = Router();

function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.render("loginPage.hbs");
  }
}

router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/user/errorLogin",
    successRedirect: "/",    
  })
);

router.get("/register", (req, res) => {
  const data = methodAndRoute(req);
  logger.info(data);
  res.render("registerPage.hbs");
});

router.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "/user/errorRegister",
    successRedirect: "/",
  })
);

router.get("/errorRegister", (req, res) => {
  const data = methodAndRoute(req);
  logger.error(data);
  res.render("pageError.hbs", { message: "error, existing user" });
});


router.get("/errorLogin", (req, res) => {
  const data = methodAndRoute(req);
  logger.error(data);
  res.render("pageError.hbs", { message: "error, invalid credentials" });
});

router.get("/logout", isAuth, (req, res) => {
  const userLogout = req.user.firstName;
  const data = methodAndRoute(req);
  logger.info(data);
  req.logOut(() => {
    res.render("logoutPage", { user: userLogout });
  });
});

module.exports = { router, isAuth };
