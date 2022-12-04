const { Router } = require("express");
const { fork } = require("child_process");
const logger = require("../src/js/logger.js");
const { methodAndRoute } = require("../src/js/functions.js");
const routerRandom = Router();



routerRandom.get("/", (req, res) => {
  const data = methodAndRoute(req);
  logger.info(data);
  let childProcess = fork("./js/childProcess.js");
  childProcess.send(JSON.stringify(req.query));
  childProcess.on("message", (resultado) => {
    res.json({ resultado });
  });
});

module.exports = routerRandom;
