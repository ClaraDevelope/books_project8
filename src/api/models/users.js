const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema(
  {
    email: { type: String, trim: true, required: true, unique: true },
    userName: { type: String, required: true },
    year: { type: Number, trim: true, required: true },
    password: { type: String, required: true, trim: true },
    porfilImage: { type: String, trim: true, required: true },
    rol: {
      type: String,
      required: true,
      enum: ['admin', 'user'],
      default: 'user',
      trim: true
    }
  },
  {
    timestamps: true,
    collection: 'users'
  }
)

userSchema.pre('save', function () {
  this.password = bcrypt.hashSync(this.password, 10)
})

const User = mongoose.model('users', userSchema, 'users')
module.exports = User
