const Joi = require('joi')

module.exports = {
  body: {
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.string().required(),
    amount: Joi.string().required()
  }
}
