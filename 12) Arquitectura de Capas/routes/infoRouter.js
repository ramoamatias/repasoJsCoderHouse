const { getInfo } = require("../controller/infoController.js");

const { Router } = require("express");

const infoRouter = Router();

infoRouter.get("/", getInfo);

module.exports = { infoRouter };
