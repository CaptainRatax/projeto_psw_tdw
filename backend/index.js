const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = 3001
const cors = require("cors");

mongoose.connect('mongodb://localhost/project_tdw_psw', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error('An error has been found when trying connecting to database. Error Details: ' + error))
db.once('open', () => console.log('The server has been successfully connected to database!'))

app.use(express.json())
app.use(cors());  
const usersRouter = require('./routes/users')
app.use('/users', usersRouter)

const productsRouter = require('./routes/products')
app.use('/products', productsRouter)

const cartsRouter = require('./routes/carts')
app.use('/carts', cartsRouter)

app.listen(port, () => console.log('The server has been started on port ' + port))