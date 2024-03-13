const deleteImgCloudinary = require('../../utils/deleteFile')
const Editoriales = require('../models/editoriales')

const getEditoriales = async (req, res, next) => {
  try {
    const editoriales = await Editoriales.find()
    return res.status(200).json(editoriales)
  } catch (error) {
    return res.status(404).json('Error en el get de las editoriales')
  }
}
const postEditoriales = async (req, res, next) => {
  try {
    const newEditorial = new Editoriales(req.body)
    if (req.file) {
      newEditorial.img = req.file.path
    }
    const editorial = await newEditorial.save()
    return res.status(201).json(editorial)
  } catch (error) {
    return res.status(400).json('Error al hacer el post de la editorial')
  }
}

const updateEditoriales = async (req, res, next) => {
  try {
    const { id } = req.params
    const editorialModify = new Editoriales(req.body)
    editorialModify._id = id
    const editorialUpdated = await Editoriales.findByIdAndUpdate(
      id,
      editorialModify
    )
    return res.status(200).json(editorialUpdated)
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Error al hacer el update de las editoriales' })
  }
}
const deleteEditorial = async (req, res, next) => {
  try {
    const { id } = req.params
    const editorial = await Editoriales.findByIdAndDelete(id)
    if (!editorial) {
      return res.status(404).json('No se encontró la editorial para eliminar')
    }
    if (editorial.img) {
      deleteImgCloudinary(editorial.img)
    }
    return res.json({ editorial, message: 'se ha eliminado' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: error.message })
  }
}

module.exports = {
  getEditoriales,
  postEditoriales,
  updateEditoriales,
  deleteEditorial
}
