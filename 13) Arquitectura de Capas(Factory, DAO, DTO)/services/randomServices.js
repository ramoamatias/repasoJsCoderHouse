const { fork } = require("child_process");

const forkProcess = async () => {
  return fork("../src/js/childProcess.js");
};

module.exports = {
  forkProcess,
};
