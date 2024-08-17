const express = require('express');

const EnderecoController = require('./controllers/EnderecoController');

const routes = express.Router();

routes.post('/enderecos', enderecoController.createEndereco);
routes.get('/enderecos', enderecoController.getAllEnderecos);
routes.get('/enderecos/:Id', enderecoController.getEnderecoById);
routes.put('/enderecos/:Id', enderecoController.updateEndereco);
routes.delete('/enderecos/:Id', enderecoController.deleteEndereco);

module.exports = routes;