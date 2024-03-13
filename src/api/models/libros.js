const mongoose = require('mongoose')

const librosSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    authory: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ['novela', 'ensayo', 'ilustrado', 'infantil', 'poesía'],
      required: true,
      trim: true
    },
    editorial: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'editoriales',
        required: false
      }
    ],
    calification: { type: Number, required: false },
    img: { type: String, required: true, trim: true },
    verified: { type: Boolean, required: true, default: false }
  },
  {
    collection: 'libros',
    timestamps: true
  }
)

const Libros = mongoose.model('libros', librosSchema, 'libros')
module.exports = Libros
