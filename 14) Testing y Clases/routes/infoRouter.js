const { InfoController } = require("../controller/infoController.js");
const { Router } = require("express");

const infoRouter = Router();

class InfoRouter {
  constructor() {
    this.infoController = new InfoController();
  }

  init() {
    infoRouter.get("/", this.infoController.getInfo);
    return infoRouter;
  }
}
module.exports = { InfoRouter };
