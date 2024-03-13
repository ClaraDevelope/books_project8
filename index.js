require('dotenv').config()
const express = require('express')
const { connectBD } = require('./src/config/db')
const { librosRouter } = require('./src/api/routes/libros')
const { editorialesRouter } = require('./src/api/routes/editoriales')
const { usersRouter } = require('./src/api/routes/users')
const cloudinary = require('cloudinary').v2

const app = express()
app.use(express.json())
const PORT = 9595
connectBD()

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

app.use('/api/v1/libros', librosRouter)
app.use('/api/v1/editoriales', editorialesRouter)
app.use('/api/v1/users', usersRouter)

app.use('*', (req, res, next) => {
  return res.status(404).json('Ruta no encontrada')
})

app.listen(PORT, () => {
  console.log('escuchamos el puerto en http://localhost:' + PORT)
})
