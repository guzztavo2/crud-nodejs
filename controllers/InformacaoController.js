const App = require('../App.js');
const Validator = require("../Services/Validation/Validator.js");
class InformacaoController {

    Index(req, res) {
        const URL = req.url.split("/");

        const result = (new Validator).make(URL, {
            1: "string|required|max:10",
            2: "number|required"
        },
            {
                "1.string": "Essa informação tem de ser em string!",
                "1.required": "A informação é obrigatória!"
            }

        );

        // console.log(result);
    }
}

module.exports = InformacaoController;