const User = require('../api/models/users')
const { verifyJwt } = require('../config/jwt')

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    if (!token || !token.startsWith('Bearer ')) {
      return res.status(401).json('No se proporcionó un token de autorización')
    }
    const parsedToken = token.substring(7)
    const { id } = verifyJwt(parsedToken)
    const user = await User.findById(id)
    user.password = null
    req.user = user
    next()
  } catch (error) {
    return res.status(401).json('Token de autorización no válido')
  }
}
const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    if (!token || !token.startsWith('Bearer ')) {
      return res.status(401).json('No se proporcionó un token de autorización')
    }
    const parsedToken = token.substring(7)
    const { id } = verifyJwt(parsedToken)

    const user = await User.findById(id)
    if (user.rol === 'admin') {
      user.password = null
      req.user = user
      next()
    } else {
      return res.status(400).json('No puedes realizar esta acción')
    }
  } catch (error) {
    return res.status(401).json('Token de autorización no válido')
  }
}

module.exports = { isAuth, isAdmin }
