const express = require('express');
const routes = express.Router()

//request, response
const basePath = __dirname + "/views"
//dirname vem no meu diretorio srv onde esta o nodemoont o + concatena o diretório em questão
routes.get('/', (request, response) => response.sendFile(basePath + "/index.html"))
routes.get('/job', (request, response) => response.sendFile(basePath + "/job.html"))
routes.get('/job/edit', (request, response) => response.sendFile(basePath + "/job-edit.html"))
routes.get('/profile', (request, response) => response.sendFile(basePath + "/profile.html"))

    



module.exports = routes;