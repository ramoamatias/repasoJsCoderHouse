const { fork } = require("child_process");

class RandomServices {
  forkProcess = async () => {
    return fork("../src/js/childProcess.js");
  };
}
module.exports = {
  RandomServices,
};
