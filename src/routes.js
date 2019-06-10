const express = require('express')
const validate = require('express-validation')
const handle = require('express-async-handler')

const routes = express.Router()

/** Middlewares */
const AuthMiddleware = require('./app/middlewares/auth')

/** Controllers */
const ProductController = require('./app/controllers/Product')
const StoreController = require('./app/controllers/Store')
const SessionController = require('./app/controllers/Session')
const UserController = require('./app/controllers/User')

/** Validators */
const ProductValidator = require('./app/validators/Product')
const UserValidator = require('./app/validators/User')
const SessionValidator = require('./app/validators/Session')
const StoreValidator = require('./app/validators/Store')

/** Routes */

/** View Products */

routes.get('/product', handle(ProductController.index))

/** Users */
routes.post('/user', validate(UserValidator), handle(UserController.store))

/** Session */
routes.post('/session', validate(SessionValidator), handle(SessionController.store))

/** Set Middleware */
routes.use(AuthMiddleware)

/** Auth routes */

/** Product */
routes.get('/product/:id', handle(ProductController.show))
routes.post('/product/', validate(ProductValidator), handle(ProductController.store))
routes.put('/product/:id', validate(ProductValidator), handle(ProductController.update))
routes.delete('/product/:id', handle(ProductController.destroy))

/** Store */
routes.get('/store', handle(StoreController.index))
routes.get('/store/:id', handle(StoreController.show))
routes.post('/store/', validate(StoreValidator), handle(StoreController.store))
routes.put('/store/:id', validate(StoreValidator), handle(StoreController.update))
routes.delete('/store/:id', handle(StoreController.destroy))

/**
 * Not Found
 */

routes.use('/*', (req, res) => {
  res.status(404).json({ error: 'Not found' })
})

module.exports = routes
