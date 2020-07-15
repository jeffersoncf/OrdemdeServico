const express = require('express');

const Cliente = require('../models/cliente');

const router = express.Router()

router.get('/', async (req, res) => {

  try {
    const clientes = await Cliente.find();

    return res.send({ clientes })

  } catch (err) {
    return res.status(400).send({ erro: 'Falha para carregar registros' })
  }

});

router.get('/:clienteId', async (req, res) => {

  try {
    
    const cliente = await Cliente.findById(req.params.clienteId);

    return res.send({ cliente })

  } catch (err) {
    return res.status(400).send({ erro: 'Falha para carregar registro' })
  }

});

router.post('/', async (req, res) => {

  const { cpf } = req.body
  try {
    if (await Cliente.findOne({ cpf }))
      return res.status(400).send({ erro: 'CPF já cadastrado' })

    const cliente = await Cliente.create(req.body)

    cliente.password = undefined

    return res.send({ cliente })

  } catch (err) {
    return res.status(400).send({ erro: 'Falha no registro' })
  }

});

router.put('/:clienteId', async (req, res) => {

  try {
    
    const { nome, cpf, email, telefone} = await req.body;

    const cliente = await Cliente.findByIdAndUpdate(req.params.clienteId, {
      nome,
      cpf,
      email,
      telefone
    }, { new: true });

    return res.send({ cliente })

  } catch (err) {
    return res.status(400).send({ erro: 'Falha no registro' })
  }

});

router.delete('/:clienteId', async (req, res) => {

  try {
    
    await Cliente.findByIdAndRemove(req.params.clienteId);

    return res.send({ })

  } catch (err) {
    return res.status(400).send({ erro: 'Falha para carregar registro' })
  }

});

module.exports = app => app.use('/os/cliente', router)