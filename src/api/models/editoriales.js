const mongoose = require('mongoose')

const editorialesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    img: { type: String, required: true, trim: true }
  },
  {
    collection: 'editoriales',
    timestamps: true
  }
)

const Editoriales = mongoose.model(
  'editoriales',
  editorialesSchema,
  'editoriales'
)
module.exports = Editoriales
