const express = require("express");
const server = express();

//configurar o servidor para apresentar arquivos estáticos
server.use('/public', express.static('public'));

// habilitar body do form
server.use(express.urlencoded({
    extended: true
}));

//configurar a conexão com o banco de dados
const Pool = require('pg').Pool;
const db = new Pool({
    user: 'postgres',
    password: '123',
    host: 'localhost',
    port: 5432,
    database: 'Doe'
});

//configurando a template engine
const nunjucks = require("nunjucks");
nunjucks.configure("./", {
    express: server,
    noCache: true,
});

//configurar a apresentação da página
server.get("/", function (req, res) {
    db.query("SELECT * FROM donors", function (err, result) {
        if (err) {
            console.log(err)
            return res.send("erro no banco de dados.")
        }
        const donors = result.rows;
        return res.render("indexserver.html", {
            donors
        });
    });


});

//pegar dados do formulario
server.post("/", function (req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const blood = req.body.blood;

    if (name == "" || email == "" || blood == "") {
        return res.send("Todos os campos são obrigátorios.");
    }

    //colocando dados no banco de dados
    const query = `
        INSERT INTO donors ("name", "email", "blood") 
        VALUES ($1, $2, $3)`;

    const values = [name, email, blood];

    db.query(query, values, function (err) {
        if (err) {
            console.log(err)
            return res.send("erro no banco de dados.")
        }
        return res.redirect("/");
    });
});

//Ligar o servidor e permitir o acesso na porta 3000
server.listen(3000, function () {
    console.log("servidor iniciado");
});