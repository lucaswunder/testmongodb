const express = require('express')
const validate = require('express-validation')
const handle = require('express-async-handler')

const routes = express.Router()

/** Middlewares */
const AuthMiddleware = require('./app/middlewares/auth')

/** Controllers */
const controllers = require('./app/controllers')

/** Validators */
const validators = require('./app/validators')

/** Routes */

/** View Products */

routes.get('/product', handle(controllers.Product.index))

/** Users */
routes.post('/user', validate(validators.User), handle(controllers.User.store))

/** Session */
routes.post('/session', validate(validators.Session), handle(controllers.Session.store))

/** Set Middleware */
routes.use(AuthMiddleware)

/** Auth routes */

/** Product */
routes.get('/product/:id', handle(controllers.Product.show))
routes.post('/product/', validate(validators.Product), handle(controllers.Product.store))
routes.put('/product/:id', validate(validators.Product), handle(controllers.Product.update))
routes.delete('/product/:id', handle(controllers.Product.destroy))

/** Store */
routes.get('/store', handle(controllers.Store.index))
routes.get('/store/:id', handle(controllers.Store.show))
routes.post('/store/', validate(validators.Store), handle(controllers.Store.store))
routes.put('/store/:id', validate(validators.Store), handle(controllers.Store.update))
routes.delete('/store/:id', handle(controllers.Store.destroy))

/**
 * Not Found
 */

routes.use('/*', (req, res) => {
  res.status(404).json({ error: 'Not found' })
})

module.exports = routes
