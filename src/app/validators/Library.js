const Joi = require('joi')

exports.create = {
  body: {
    title: Joi.string().required(),
    isbn: Joi.string().required()
  }
}
exports.byId = {
  params: {
    id: Joi.string().required()
  }
}
