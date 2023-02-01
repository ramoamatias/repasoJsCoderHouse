const { methodAndRoute, logger } = require("../services/homeServices.js");
const { infoProcess } = require("../services/infoServices.js");

const getInfo = async (req, res) => {
  const data = methodAndRoute(req);
  logger.info(data);
  const dataProcess = infoProcess();
  res.render("infoPage.hbs", dataProcess);
};

module.exports = {
  getInfo,
};
