const express = require('express');
const enderecoController = require('./controller/EnderecoController');

const router = express.Router();

router.post('/enderecos/new', enderecoController.createEndereco);
router.get('/enderecos', enderecoController.getAllEnderecos);
router.get('/enderecos/:Id', enderecoController.getEnderecoById);
router.put('/enderecos/edit/:Id', enderecoController.updateEndereco);
router.delete('/enderecos/delete/:Id', enderecoController.deleteEndereco);
router.post('/enderecos/viacep/new', enderecoController.createEnderecoViaCep);

module.exports = router;