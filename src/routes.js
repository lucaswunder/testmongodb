const express = require('express')
const routes = express.Router()

/** Middlewares */
const AuthMiddleware = require('./app/middlewares/auth')

/** Controller */
const controllers = require('./app/controllers')

/** Routes */
routes.post('/user', controllers.User.store)
routes.post('/session', controllers.Session.store)

routes.get('/teste', AuthMiddleware, (req, res) => {
  return res.status(201).json({ code: 'feito' })
})

module.exports = routes
