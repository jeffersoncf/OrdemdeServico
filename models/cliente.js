const mongoose = require('../database')

const ClienteSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
      },
      cpf: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
      },
      telefone: {
        type: String,
        required: true,
      },
      dataCadastro: {
        type: Date,
        default: Date.now,
      }
})


const Cliente = mongoose.model('Cliente', ClienteSchema)

module.exports = Cliente