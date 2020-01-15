const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const options = {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  toJSON: {
    virtuals: true
  }
}

const dimensions = new mongoose.Schema({
  length: Number,
  width: Number,
  height: Number
}, { _id: false })

const LibrarySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  isbn: {
    type: Number,
    required: true
  },
  author: {
    type: String
  },
  publishing_company: {
    type: String
  },
  year: {
    type: String
  },
  language: {
    type: String
  },
  weight: {
    type: String
  },
  dimensions
}, { versionKey: false }, options)

LibrarySchema.plugin(mongoosePaginate)

module.exports = mongoose.model('library', LibrarySchema)
