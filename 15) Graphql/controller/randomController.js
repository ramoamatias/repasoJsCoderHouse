const { HomeServices } = require("../services/homeServices.js");
const { RandomServices } = require("../services/randomServices.js");

class RandomController {
  constructor() {
    this.homeServices = new HomeServices();
    this.randomServices = new RandomServices();
  }

  forkFunction = async (req, res) => {
    const data = this.homeServices.methodAndRoute(req);
    this.homeServices.logger.info(data);
    let childProcess = this.randomServices.forkProcess();
    childProcess.send(JSON.stringify(req.query));
    childProcess.on("message", (resultado) => {
      res.json({ resultado });
    });
  };
}
module.exports = {
  RandomController,
};
