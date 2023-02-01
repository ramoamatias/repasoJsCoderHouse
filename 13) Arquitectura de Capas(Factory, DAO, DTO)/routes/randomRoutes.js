const { Router } = require("express");
const { forkFunction } = require("../controller/randomController.js");

const randomRouter = Router();

randomRouter.get("/", forkFunction);

module.exports = { randomRouter };
