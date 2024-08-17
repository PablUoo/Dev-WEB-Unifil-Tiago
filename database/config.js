const Squelize = require('sequelize')
const config = require('../config/database')

const Endereco = require('../models/Endereco')

const connection = new Squelize(config)

Endereco.init(connection)
Endereco.associate(connection.models)

module.exports = connection