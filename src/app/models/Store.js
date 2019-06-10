const mongoose = require('mongoose')

const StoreSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Store', StoreSchema)
