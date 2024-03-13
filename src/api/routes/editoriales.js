const upload = require('../../middlewares/File')
const { isAdmin } = require('../../middlewares/auth')
const {
  getEditoriales,
  postEditoriales,
  updateEditoriales,
  deleteEditorial
} = require('../controllers/editoriales')

const editorialesRouter = require('express').Router()

editorialesRouter.get('/', getEditoriales)
editorialesRouter.post('/', [isAdmin], upload.single('img'), postEditoriales)
editorialesRouter.put('/:id', [isAdmin], updateEditoriales)
editorialesRouter.delete('/:id', [isAdmin], deleteEditorial)

module.exports = { editorialesRouter }
