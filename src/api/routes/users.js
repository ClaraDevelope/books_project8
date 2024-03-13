const upload = require('../../middlewares/File')
const { isAdmin } = require('../../middlewares/auth')
const {
  getUsers,
  register,
  login,
  updateUsers,
  deleteUsers,
  logout
} = require('../controllers/users')

const usersRouter = require('express').Router()

usersRouter.get('/', [isAdmin], getUsers)
usersRouter.post('/register', upload.single('porfilImage'), register)
usersRouter.post('/login', login)
usersRouter.put('/:id', [isAdmin], updateUsers)
usersRouter.delete('/:id', [isAdmin], deleteUsers)
usersRouter.post('/logout', logout)

module.exports = { usersRouter }
