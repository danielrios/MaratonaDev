const express = require("express");
const server = express();

//configurar o servidor para apresentar arquivos estáticos
server.use('/public', express.static('public'));

// habilitar body do form
server.use(express.urlencoded({extended: true}));

//configurando a template engine
const nunjucks = require("nunjucks");
nunjucks.configure("./", {
    express: server,
    noCache: true,
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
];

//configurar a apresentação da página
server.get("/", function (req, res) {
    return res.render("indexserver.html", { donors });
});

//pegar dados do formulario
server.post("/", function(req, res){
    const name = req.body.name;
    const email = req.body.email;
    const blood = req.body.blood;

    //colocando dados no array
    donors.push({
        name: name,
        blood: blood,
    });
    return res.redirect("/");
});

//Ligar o servidor e permitir o acesso na porta 3000
server.listen(3000, function () {
    console.log("servidor iniciado");
});