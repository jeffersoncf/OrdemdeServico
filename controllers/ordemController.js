const express = require('express');

const Ordem = require('../models/ordem');

const router = express.Router()

router.get('/', async (req, res) => {

  try {
    const ordems = await Ordem.find();

    return res.send({ ordems })

  } catch (err) {
    return res.status(400).send({ erro: 'Falha para carregar registros' })
  }

});

router.get('/:ordemId', async (req, res) => {

  try {
    
    const ordem = await Ordem.findById(req.params.ordemId);

    return res.send({ ordem })

  } catch (err) {
    return res.status(400).send({ erro: 'Falha para carregar registro' })
  }

});

router.post('/', async (req, res) => {

  try {
    
    const ordem = await Ordem.create(req.body)
    

    return res.send({ ordem })

  } catch (err) {
    return res.status(400).send({ erro: 'Falha no registro' })
  }

});

router.put('/:ordemId', async (req, res) => {

  try {
    
    const { descricao, tipo, servico, finalizada} = await req.body;

    const ordem = await Ordem.findByIdAndUpdate(req.params.ordemId, {
      descricao,
      tipo,
      servico,
      finalizada

    }, { new: true });

    return res.send({ ordem })

  } catch (err) {
    return res.status(400).send({ erro: 'Falha no registro' })
  }

});

router.delete('/:ordemId', async (req, res) => {

  try {
    
    await Ordem.findByIdAndRemove(req.params.ordemId);

    return res.send({ })

  } catch (err) {
    return res.status(400).send({ erro: 'Falha para carregar registro' })
  }

});

module.exports = app => app.use('/os/ordem', router)