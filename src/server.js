const express = require('express');
const routes = require('./routes');

require('./database');

const app = express();

app.use(express.json());
app.use(routes);


// const axios = require('axios');
// const cepRegex = /^[0-9]{5}-?\[0-9]{3}$/;
// app.get('/consulta-cep/:cep', async (req, res) => {
//     const cep = req.params.cep;

//         if(cepRegex.test(cep)){
//             try {
//                 const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
//                 res.json(response.data);
//             } catch (error) {
//                 console.error('Erro na consulta da requisição Cep', error);
//                 res.status(500).send("Erro ao consultar Cep");
//             }
//         }else{
//             res.status(400).send("Cep Invalido");
//         }
//     });

// app.get('/consulta-moeda/:moeda/:numero_dias', async (req, res) => {
//     const moeda = req.params.moeda;
//     const numero_dias = req.params.numero_dias;

//     try {
//         const response = await axios.get(`https://economia.awesomeapi.com.br/json/daily/${moeda}/${numero_dias}`);
//         res.json(response.data);
//     } catch (error) {
//         console.error('Erro na consulta da requisição Moeda', error);
//         res.status(500).send("Erro ao consultar Moeda");
//     }
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${port}`));
