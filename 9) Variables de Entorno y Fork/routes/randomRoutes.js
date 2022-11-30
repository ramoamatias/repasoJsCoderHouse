const { Router } = require("express");
const routerRandom = Router();
const { fork } = require("child_process");



routerRandom.get("/", (req, res) => {
  let childProcess = fork("./js/childProcess.js");
  childProcess.send(JSON.stringify(req.query));
  childProcess.on("message", (resultado) => {
    res.json({ resultado });
  });
});

module.exports = routerRandom;
