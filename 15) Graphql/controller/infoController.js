const { HomeServices } = require("../services/homeServices.js");
const { InfoServices } = require("../services/infoServices.js");

class InfoController {
  constructor() {
    this.homeServices = new HomeServices();
    this.infoServices = new InfoServices();
  }
  
  getInfo = async (req, res) => {
    const data = this.homeServices.methodAndRoute(req);
    this.homeServices.logger.info(data);
    const dataProcess = this.infoServices.infoProcess();
    res.render("infoPage.hbs", dataProcess);
  };
  
  getInfoGraphql = async ()=>{
    const dataProcess = this.infoServices.infoProcess();
    return dataProcess;
  }
}
module.exports = {
  InfoController,
};
