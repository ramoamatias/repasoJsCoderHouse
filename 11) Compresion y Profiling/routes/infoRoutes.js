const { Router } = require("express");
const logger = require("../src/js/logger.js");
const { methodAndRoute } = require("../src/js/functions.js");
const numCPUs = require("os").cpus().length;
const routerInfo = Router();


routerInfo.get("/", (req, res) => {
  const data = methodAndRoute(req);
  logger.info(data);
  res.render("infoPage.hbs", {
    args: process.argv.splice(2),
    nameSO: process.platform,
    nodeVersion: process.version,
    memoryReserved: process.memoryUsage().rss,
    path: process.execPath,
    processId: process.pid,
    folderProyect: process.cwd(),
    numCpus: numCPUs,
  });
});

module.exports = routerInfo;
