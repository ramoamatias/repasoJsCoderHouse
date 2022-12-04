const { Router } = require("express");
const numCPUs = require("os").cpus().length;
const routerInfo = Router();

routerInfo.get("/", (req, res) => {
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
