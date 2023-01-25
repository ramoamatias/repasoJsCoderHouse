const log4js = require("log4js");

const methodAndRoute = (req) => {
  const obj = {
    rute: req.originalUrl,
    method: req.method,
  };
  return obj;
};

log4js.configure({
  appenders: {
    myConsole: { type: "console" }, //Apender base- basico
    myWarnFile: { type: "file", filename: "warn.log" },
    myErrorFile: { type: "file", filename: "error.log" },
    logDebug: {
      type: "logLevelFilter",
      appender: "myConsole",
      level: "info",
    },
    logError: {
      type: "logLevelFilter",
      appender: "myErrorFile",
      level: "error",
    },
    logWarn: {
      type: "logLevelFilter",
      appender: "myWarnFile",
      level: "warn",
    },
  },
  categories: {
    default: { appenders: ["logDebug", "logWarn", "logError"], level: "all" },
  },
});

let logger = log4js.getLogger();
module.exports = {
  methodAndRoute,
  logger,
};
