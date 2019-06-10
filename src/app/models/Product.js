const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const ProductSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

ProductSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Product', ProductSchema)
