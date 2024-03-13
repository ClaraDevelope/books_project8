const Libros = require('../models/libros')
const deleteImgCloudinary = require('../../utils/deleteFile')

const getLibros = async (req, res, next) => {
  try {
    const libros = await Libros.find().populate('editorial')
    return res.status(200).json(libros)
  } catch (error) {
    console.log(error)
    return res.status(400).json('Error al hacer el get de los libros')
  }
}

const postLibros = async (req, res, next) => {
  try {
    const newLibro = await new Libros(req.body)
    if (req.file) {
      newLibro.img = req.file.path
    }
    if (req.user.rol === 'admin') {
      newLibro.verified = true
    } else {
      newLibro.verified = false
    }
    const libro = await newLibro.save()
    return res.status(201).json(libro)
  } catch (error) {
    return res.status(400).json('no se ha hecho el post correctamente')
  }
}

const updateLibros = async (req, res, next) => {
  try {
    const { id } = req.params
    const libroUpdated = await Libros.findByIdAndUpdate(
      id,
      {
        ...req.body,
        img: req.file ? req.file.path : 'not image'
      },
      { new: true }
    )
    if (!libroUpdated) {
      return res.status(404).json({ message: 'libro no encontrado' })
    }
    return res.status(200).json(libroUpdated)
  } catch (error) {
    return res.status(400).json('Error al hacer update del libro')
  }
}

const deleteLibros = async (req, res, next) => {
  try {
    const { id } = req.params
    const libro = await Libros.findByIdAndDelete(id)
    if (libro.img) {
      deleteImgCloudinary(libro.img)
    }
    return res.status(200).json(libro)
  } catch (error) {
    return res.status(400).json('Error al eliminar el libro')
  }
}

module.exports = {
  getLibros,
  postLibros,
  updateLibros,
  deleteLibros
}
