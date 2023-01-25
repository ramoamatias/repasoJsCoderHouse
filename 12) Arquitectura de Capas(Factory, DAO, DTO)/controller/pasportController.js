const { logger, methodAndRoute } = require("../services/homeServices.js");
const { validExistUser, validCredentials } = require("../services/passportServices.js");

const register = async (req, email, password, done) => {
  const data = methodAndRoute(req);
  logger.info(data);
  await validExistUser(req, email, done);
};

const login = async (req, email, password, done) => {
  const data = methodAndRoute(req);
  logger.info(data);
  await validCredentials(req,email, password,done);
};

module.exports = {
  register,
  login,
};
