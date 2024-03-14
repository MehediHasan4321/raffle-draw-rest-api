require('dotenv').config('../.env')
const express = require('express')
const {errorHandler,notFoundError} = require('./error')


const app = express()



app.use(require('./middleware'))

app.use(require('./routes'))

app.use(notFoundError)
app.use(errorHandler)


module.exports = app