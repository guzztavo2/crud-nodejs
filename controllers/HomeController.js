const App = require('../App.js');
class HomeController {
    configFile;

    constructor() {
        this.configFile = App.getConfigFile();
    }
    Index(req, res) {
        res.render("../views/index.html", { HOME_URL: this.configFile['APP_URL'] + ":" + this.configFile['APP_PORT'] });
    }

    error(req, res) {
        res.render("../views/404.html", { HOME_URL: this.configFile['APP_URL'] + ":" + this.configFile['APP_PORT'] });
    }
}

module.exports = HomeController;