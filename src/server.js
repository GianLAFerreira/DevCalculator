const express = require("express")
const server = express()
const routes = require("./routes")
const path = require("path")

// usando template engine
server.set('view engine', 'ejs')

server.set('views', path.join(__dirname, 'views'))

//const basePath = __dirname + "views"
//dirname vem no meu diretorio srv onde esta o nodemoont o + concatena o diretório em questão

// Mudar  a localizaçãoda pasta viwes

//habilitar arquivos estaticos
server.use(express.static("public"))

//usar o req body
//use serve para habilitar/configurar o servidor
server.use(express.urlencoded({extend: true}))

//routes
server.use(routes)
server.listen(3000, () => console.log('rodando...'))