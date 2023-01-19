const { methodAndRoute,logger } = require("../services/homeServices.js");
const { forkProcess } = require("../services/randomServices.js");

const forkFunction = async(req, res) => {
    const data = methodAndRoute(req);
    logger.info(data);
    let childProcess = forkProcess();
    childProcess.send(JSON.stringify(req.query));
    childProcess.on("message", (resultado) => {
      res.json({ resultado });
    });
  }

module.exports = {
    forkFunction
}