const express = require('express');

const Usuario = require('../models/usuario');

const router = express.Router()

router.get('/', async (req, res) => {

  try {
    const usuarios = await Usuario.find();

    return res.send({ usuarios })

  } catch (err) {
    return res.status(400).send({ erro: 'Falha para carregar registros' })
  }

});

router.get('/:usuarioId', async (req, res) => {

  try {
    
    const usuario = await Usuario.findById(req.params.usuarioId);

    return res.send({ usuario })

  } catch (err) {
    return res.status(400).send({ erro: 'Falha para carregar registro' })
  }

});

router.post('/', async (req, res) => {

  const { email } = req.body
  try {
    if (await Usuario.findOne({ email }))
      return res.status(400).send({ erro: 'Email já cadastrado' })

    const usuario = await Usuario.create(req.body)

    usuario.password = undefined

    return res.send({ usuario })

  } catch (err) {
    return res.status(400).send({ erro: 'Falha no registro' })
  }

});

router.put('/:usuarioId', async (req, res) => {

  const { _id } = req.body
  try {
    
    const { nome, email, senha} = await req.body;

    const usuario = await Usuario.findByIdAndUpdate(req.params.usuarioId, {
      nome,
      email,
      senha
    }, { new: true });

    return res.send({ usuario })

  } catch (err) {
    return res.status(400).send({ erro: 'Falha no registro' })
  }

});

router.delete('/:usuarioId', async (req, res) => {

  try {
    
    const usuario = await Usuario.findByIdAndRemove(req.params.usuarioId);

    return res.send({ })

  } catch (err) {
    return res.status(400).send({ erro: 'Falha para carregar registro' })
  }

});

module.exports = app => app.use('/os/usuario', router)