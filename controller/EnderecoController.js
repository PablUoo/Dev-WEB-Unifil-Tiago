const { Endereco } = require('../models');
const axios = require('axios');

exports.createEndereco = async (req, res) => {
    try{
        const{ Cep, Logradouro, Numero, Complemento, Bairro, Cidade, Estado, MunicipioIBGE } = req.body;
        const novoEndereco = await Endereco.create({
            Cep,
            Logradouro,
            Numero,
            Complemento,
            Bairro,
            Cidade,
            Estado,
            MunicipioIBGE
        });

        res.status(201).json(novoEndereco);
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
    const { Id } = req.params;
    const{ Cep, Logradouro, Numero, Complemento, Bairro, Cidade, Estado, MunicipioIBGE } = req.body;

    const endereco = await Endereco.findByPk(Id);

    if (!endereco) {
        return res.status(404).json({ error: 'Endereço não encontrado '});
    }
    
    endereco.Cep = Cep;
    endereco.Logradouro = Logradouro;
    endereco.Numero = Numero;
    endereco.Complemento = Complemento;
    endereco.Bairro = Bairro;
    endereco.Cidade = Cidade;
    endereco.Estado = Estado;
    endereco.MunicipioIBGE = MunicipioIBGE;

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

exports.createEnderecoFromCep = async (req, res) => {
    try {
        const cep = req.body.cep;

        const api = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

        if (api.data.erro) {
            return res.status(404).json({ error: 'CEP não encontrado' });
        }

        const { logradouro, complemento, bairro, localidade, uf, ibge } = api.data;
        
        const novoEndereco = await Endereco.create({
            cep: cep,
            logradouro: logradouro,
            numero: req.body.numero,
            complemento: complemento || req.body.complemento,
            bairro: bairro,
            cidade: localidade,
            estado: uf,
            ibge: ibge
        });

        res.status(201).json(novoEndereco);
    } catch (error) {
        res.status(500).json({ error: 'Falha ao criar um novo endereço a partir do CEP', details: error.message });
    }
};
