const numCPUs = require("os").cpus().length;

const infoProcess = async () => {
  const obj = {
    args: process.argv.splice(2),
    nameSO: process.platform,
    nodeVersion: process.version,
    memoryReserved: process.memoryUsage().rss,
    path: process.execPath,
    processId: process.pid,
    folderProyect: process.cwd(),
    numCpus: numCPUs,
  };
  return obj
};

module.exports = {
  infoProcess,
};
