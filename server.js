//configurando o servidor
const express = require("express")
const server = express()

//configurar o servidor para apresentar arquivos estaticos (css, imagens...)
server.use(express.static('public'))

//habilitar corpo do form
server.use(express.urlencoded({extended: true}))

//configurar banco de dados
const Pool = require('pg').Pool
const db = new Pool({
    user: 'postgres',
    password: '0000',
    host: 'localhost',
    port: 5432,
    database: 'doe'

})

//configurando a template engine
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express: server,
    noCache: true,
}) //indica que o index html está na raiz do projeto

//configurar a apresentação da página
server.get("/", function(request, response){
    
    db.query("SELECT * FROM doadores", function(err, result){
        if(err)
            return response.send("Erro de banco de dados")
   
    const doadores = result.rows;
    return response.render("index.html", {doadores});
    })
})

server.post("/", function(request, response){
    const nome = request.body.nome
    const email = request.body.email
    const tipoSanguineo = request.body.tipoSanguineo

    if(nome == "" || email == "" || tipoSanguineo == "")
        return response.send("Todos os campos são obrigatórios.")

    const query = `INSERT INTO doadores ("nome","email", "sangue") 
                   VALUES ($1, $2, $3)`

    db.query(query, [nome, email, tipoSanguineo], function(err){

        if(err) 
            return res.send("Erro no banco de dados.")
    
        return response.redirect("/")

    })
})
//ligar o servidor e permitir acesso na porta 3000
server.listen(3000)

//npm start
