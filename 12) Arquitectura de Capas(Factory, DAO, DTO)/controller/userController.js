const passport = require("passport");
const { methodAndRoute, logger } = require("../services/homeServices");

function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.render("loginPage.hbs");
  }
}


const registerGet = async (req, res) => {
  const data = methodAndRoute(req);
  logger.info(data);
  res.render("registerPage.hbs");
};

const errorRegister = async (req, res) => {
  const data = methodAndRoute(req);
  logger.error(data);
  res.render("pageError.hbs", { message: "error, existing user" });
};

const errorLogin = async (req, res) => {
  const data = methodAndRoute(req);
  logger.error(data);
  res.render("pageError.hbs", { message: "error, invalid credentials" });
};

const logout = async (req, res) => {
  const userLogout = req.user.firstName;
  const data = methodAndRoute(req);
  logger.info(data);
  req.logOut(() => {
    res.render("logoutPage", { user: userLogout });
  });
};

module.exports = {
  isAuth,
  registerGet,
  
  errorRegister,
  errorLogin,
  logout,
};
