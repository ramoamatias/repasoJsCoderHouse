const { Router } = require("express");
const passport = require("passport");

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
  res.render("pageError.hbs", { message: "error, existing user" });
});

router.get("/errorLogin", (req, res) => {
  console.log("DENTI EDK ERROR");
  res.render("pageError.hbs", { message: "error, invalid credentials" });
});

router.get("/logout", isAuth, (req, res) => {
  const userLogout = req.user.firstName;
  req.logOut(res.render("logoutPage", { user: userLogout }));
});

module.exports = { router, isAuth };
