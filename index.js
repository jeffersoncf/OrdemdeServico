const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


require('./controllers/usuarioController')(app)
require('./controllers/clienteController')(app)
require('./controllers/ordemController')(app)

app.listen(3000)