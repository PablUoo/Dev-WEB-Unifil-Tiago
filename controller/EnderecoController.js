const { Endereco } = require('../models');
const axios = require('axios');

exports.createEndereco = async (req, res) => {
    try{
        const{ cep, logradouro, numero, complemento, bairro, cidade, estado, ibge } = req.body;
        const novoEndereco = await Endereco.create({
            cep,
            logradouro,
            numero,
            complemento,
            bairro,
            cidade,
            estado,
            ibge
        });

        res.status(201).json({endereco: novoEndereco});
    } catch (error) {
        res.status(500).json({ error: 'Falha ao criar um novo endereço', details: error.message });
    }
};

exports.getAllEnderecos = async (req, res) => {
    try {
        const enderecos = await Endereco.findAll();
        res.status(201).json(enderecos);
    } catch (error) {
        res.status(500).json({ error: 'Falha ao buscar os endereços', details: error.message });
    }
};

exports.getEnderecoById = async (req, res) => {
    try {
        const { Id } = req.params;
        const endereco = await Endereco.findByPk(Id);

        if (!endereco) {
            return res.status(404).json({ error: 'Endereço não encontrado '});
        }

        res.status(200).json(endereco);
    } catch (error) {
        res.status(500).json({ error: 'Falha ao buscar o endereço', details: error.message });
    }
};

exports.updateEndereco = async (req, res) => {
  try {
    const { id } = req.params;
    const{ cep, logradouro, numero, complemento, bairro, cidade, estado, ibge } = req.body;

    const endereco = await Endereco.findByPk(id);

    if (!endereco) {
        return res.status(404).json({ error: 'Endereço não encontrado '});
    }
    
    endereco.cep = cep;
    endereco.logradouro = logradouro;
    endereco.numero = numero;
    endereco.complemento = complemento;
    endereco.bairro = bairro;
    endereco.cidade = cidade;
    endereco.estado = estado;
    endereco.ibge = ibge;

    await endereco.save();

    res.status(200).json(endereco);
  } catch (error) {
    res.status(500).json({ error: 'Falha ao atualizar o endereço', details: error.message });
  }
};

exports.deleteEndereco = async (req, res) => {
    try {
        const { Id } = req.params;
        
        const endereco = await Endereco.findByPk(Id);

        if (!endereco) {
            return res.status(404).json({ error: 'Endereço não encontrado '});
        }

        await endereco.destroy();

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Falha ao deletar o endereço', details: error.message });
    }
};

exports.createEnderecoViaCep = async (req, res) => {
    try {
        const cep = req.body.cep;

        const api = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

        if (api.data.erro) {
            return res.status(404).json({ error: 'CEP não encontrado' });
        }

        const { logradouro, bairro, localidade, uf, ibge } = api.data;
        
        const novoEndereco = await Endereco.create({
            cep: cep,
            logradouro: logradouro,
            numero: req.body.numero,
            complemento: req.body.complemento,
            bairro: bairro,
            cidade: localidade,
            estado: uf,
            ibge: ibge
        });

        res.status(201).json({endereco: novoEndereco});
    } catch (error) {
        res.status(500).json({ error: 'Falha ao criar um novo endereço a partir do CEP', details: error.message });
    }
};
