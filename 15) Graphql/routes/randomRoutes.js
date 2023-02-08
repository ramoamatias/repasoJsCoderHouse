const { Router } = require("express");
const { RandomController } = require("../controller/randomController.js");

const randomRouter = Router();

class RandomRouter {
  constructor() {
    this.randomController = new RandomController();
  }

  init() {
    randomRouter.get("/",  this.randomController.forkFunction);
    return randomRouter;
  }
}
module.exports = { RandomRouter };
