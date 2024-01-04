const fs = require('fs');
const express = require('express');
const path = require('path');

class App {

    configurationList;

    constructor() {

        this.server = express();

        this.configurationList = App.getConfigFile();

        this.initConfigServer();

        this.defineRoutes();

    }

    defineRoutes() {
        const routes = JSON.parse(fs.readFileSync("./Routes/routes.json").toString());

        routes.forEach((route) => {

            const controllerArray = route.controller.split('::');

            this.server[route.method](route.url, (req, res) => {

                const controllerPage = require('./Controllers/' + controllerArray[0]);

                const controller = new controllerPage();

                controller[controllerArray[1]](req, res);

                res.end();
            });
        });

    }

    initConfigServer() {

        this.server.engine('html', require('ejs').renderFile);

        this.server.set('view engine', 'html');

        this.server.use('/public', express.static(path.join(__dirname, 'public')));

        this.server.set('views', path.join(__dirname, '/views'));

        this.server.listen(this.configurationList.APP_PORT, this.configurationList.APP_URL, () => {
            console.log("Servidor iniciado");
        });
    }

    static getConfigFile() {
        return JSON.parse(fs.readFileSync("config.json").toString());
    }

    static getActualLocalization(req) {
        return req.headers.host;
    }
}

module.exports = App;