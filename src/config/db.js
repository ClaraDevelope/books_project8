const mongoose = require('mongoose')

const connectBD = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log('conectada a la BBDD')
  } catch (error) {
    console.log('error en la conexión co nla BBDD')
  }
}

module.exports = { connectBD }
