const { DataTypes, Model } = require('sequelize');
class Endereco extends Model {}

Endereco.init({
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cep:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    logradouro:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    numero:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    complemento:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    bairro:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    cidade:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    estado:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    ibge:{
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'Endereco',
    tableName: 'enderecos',
    timestamps: true
});
module.exports = Endereco;