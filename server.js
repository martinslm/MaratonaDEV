const express = require("express")
const server = express()

server.get("/", function(request, response){
    return response.send("ok");
})

server.listen(3000)