const methodAndRoute = (req) => {
  const obj = {
    rute: req.originalUrl,
    method: req.method,
  };
  return obj;
};

module.exports = {
  methodAndRoute
}
