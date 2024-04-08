const express = require("express");
const app = express();
const port = 8081;

const cliente = require("./models/clientes");


const handlebars = require("express-handlebars").engine
app.engine("handlebars", handlebars({defaultLayout: "main"}));
app.set("view engine", "handlebars")

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


// ROTAS

app.get("/", function(req, res) {
    res.render("cadastro")
})

// consulta
app.get("/consulta", function(req, res){
    cliente.findAll().then(function(cliente){
        res.render("consulta", {cliente})
    }).catch(function(erro){
        console.log("Erro ao carregar dados do banco: " + erro)
    })
})


// cadastrar
app.post("/cadastrar", function(req, res){
    cliente.create({
        nome: req.body.nome,
        endereco: req.body.endereco,
        bairro: req.body.bairro,
        cep: req.body.cep,
        cidade: req.body.cidade,
        estado: req.body.estado
    }).then(function(){
        res.redirect("consulta")
    }).catch(function(erro){
        res.send("Falha ao cadastrar os dados: " + erro)
    })
})

// excluir
app.get("/excluir/:id", function(req, res){
    cliente.destroy({where: {'id': req.params.id}}).then(function(){
        res.render("consulta")
    }).catch(function(erro){
        console.log("Erro ao excluir ou encontrar os dados do banco: " + erro)
    })
})

// editar
app.get("/editar/:id", function(req, res){
    cliente.findAll({where: {'id': req.params.id}}).then(function(cliente){
        res.render("editar", {cliente})
    }).catch(function(erro){
        console.log("Erro ao carregar dados do banco: " + erro)
    })
})

// atualizar
app.post("/atualizar", function(req, res){
    cliente.update({
        nome: req.body.nome,
        endereco: req.body.endereco,
        bairro: req.body.bairro,
        cep: req.body.cep,
        cidade: req.body.cidade,
        estado: req.body.estado
    },{
        where: {
            id: req.body.id
        }
    }).then(function(){
        res.redirect("consulta")
    })
})


app.listen(port, function() {
    console.log("Servidor rodando")
})