const upload = require('../../middlewares/File')
const { isAuth, isAdmin } = require('../../middlewares/auth')
const {
  getLibros,
  postLibros,
  updateLibros,
  deleteLibros
} = require('../controllers/libros')

const librosRouter = require('express').Router()

librosRouter.get('/', getLibros)
librosRouter.post('/', [isAuth], upload.single('img'), postLibros)
librosRouter.put('/:id', [isAdmin], updateLibros)
librosRouter.delete('/:id', [isAdmin], deleteLibros)

module.exports = { librosRouter }
