const log4js = require("log4js");
/* distintos tipos de categorias que podemos tener para los logs segun sus niveles 
  Trace, debug,info,warn, error, fatal, 
  y si indico uno me mostrara a partir del indicado y todos los que tenga a la derecha*/

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
module.exports = logger;
