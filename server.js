//configurando o servidor
const express = require("express")
const server = express()

//configurar o servidor para apresentar arquivos estaticos (css, imagens...)
server.use(express.static('public'))

//configurando a template engine
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express: server,
    noCache: true,
}) //indica que o index html está na raiz do projeto

const doadores= [
    {
        nome: "Larissa",
        sangue: "A+"
    },
    {
        nome: "Christian",
        sangue: "B-"
    },
    {
        nome: "Guilherme",
        sangue: "AB-"
    },
    {
        nome: "Leonardo",
        sangue: "O+"
    }
]

//configurar a apresentação da página
server.get("/", function(request, response){
    return response.render("index.html", {doadores});
})

//ligar o sservidor e permitir acesso na porta 3000
server.listen(3000)