const express = require("express");
const server = express();

//configurar o servidor para apresentar arquivos estáticos
server.use('/public', express.static('public'));

//configurando a template engine
const nunjucks = require("nunjucks");
nunjucks.configure("./", {
    express: server
});

//Lista de doadores: Array
const donors = [{
        name: "Daniel Rios",
        blood: "AB+"
    },
    {
        name: "Diego",
        blood: "B+"
    },
    {
        name: "Mayk",
        blood: "A+"
    },
    {
        name: "Rios",
        blood: "O+"
    },
]

//configurar a apresentação da página
server.get("/", function (req, res) {
    return res.render("index.html", { valor:"1" });
});

//Ligar o servidor e permitir o acesso na porta 3000
server.listen(3000, function () {
    console.log("servidor iniciado");
});