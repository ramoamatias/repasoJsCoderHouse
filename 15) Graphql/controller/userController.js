const { HomeServices } = require("../services/homeServices");

class UserController {
  constructor() {
    this.homeServices = new HomeServices();
  }

  isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.render("loginPage.hbs");
    }
  };

  registerGet = async (req, res) => {
    const data = this.homeServices.methodAndRoute(req);
    this.homeServices.logger.info(data);
    res.render("registerPage.hbs");
  };

  errorRegister = async (req, res) => {
    const data = this.homeServices.methodAndRoute(req);
    this.homeServices.logger.error(data);
    res.render("pageError.hbs", { message: "error, existing user" });
  };

  errorLogin = async (req, res) => {
    const data = this.homeServices.methodAndRoute(req);
    this.homeServices.logger.error(data);
    res.render("pageError.hbs", { message: "error, invalid credentials" });
  };

  logout = async (req, res) => {
    const userLogout = req.user.firstName;
    const data = this.homeServices.methodAndRoute(req);
    this.homeServices.logger.info(data);
    req.logOut(() => {
      res.render("logoutPage", { user: userLogout });
    });
  };
}

module.exports = {
  UserController,
};
