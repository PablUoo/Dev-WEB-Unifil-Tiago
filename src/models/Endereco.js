const { Model, DataTypes } = require('sequelize');

class Endereco extends Model {
  static init(sequelize) {
    super.init({
      cep: DataTypes.STRING,
      logradouro: DataTypes.STRING,
      numero: DataTypes.INTEGER,
      complemento: DataTypes.STRING,
      bairro: DataTypes.STRING,
      cidade: DataTypes.STRING,
      estado: DataTypes.STRING,
      ibge: DataTypes.STRING,
    }, {
      sequelize,
      modelName: 'Endereco',
      tableName: 'enderecos',
      timestamps: true,
    })
  }
}
module.exports = Endereco;