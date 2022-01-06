const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 4000; //Variavel para declaração de porta
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");


//******************************************************** */

//Data base

connection
    .authenticate()
    .then(() => {
        console.log('Conexão feita com o BD');
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })


//******************************************************** */

//Dizendo para o Express usar o EJS como View Engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

//BodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//******************************************************** */

//Definindo rotas

app.get('/', (req , res)=>{
    Pergunta.findAll({ raw: true, order:[
        ['id','DESC']
    ] }).then(perguntas => {
        res.render("index", {
            perguntas: perguntas
        });
    });
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    })
});

app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){ // Pergunta encontrada

            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order: [
                    ['id', 'DESC']
                ]
            }).then(respostas => {
                res.render("pergunta", {
                    pergunta: pergunta,
                    respostas: respostas
                }); 
            });

        }else { // Pergunta não encontrada
            res.redirect("/");
        }
    });
});

app.post("/responder", (req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/"+perguntaId);
    });
});

//******************************************************** */

//Iniciando conexão
app.listen(port, () => {
    console.log('Servidor iniciado em http://localhost:4000');
})