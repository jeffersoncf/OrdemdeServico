const mongoose = require('../database')

const OrdemSchema = new mongoose.Schema({
    descricao: {
        type: String,
        required: true,
      },
      tipo: {
        type: String,
        required: true,
      },
      servico: {
        type: String,
        required: true,
      },
      cliente: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Cliente',
      },
      finalizada: {
        type: Boolean,
        require: true,
        default: false,
      },
      dataServico: {
        type: Date,
        default: Date.now,
      }
})

const Ordem= mongoose.model('Ordem', OrdemSchema)

module.exports = Ordem