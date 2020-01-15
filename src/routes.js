const express = require('express')
const validate = require('express-validation')
const handle = require('express-async-handler')

const routes = express.Router()

/** Middlewares */
const AuthMiddleware = require('./app/middlewares/auth')

/** Controllers */
const LibraryController = require('./app/controllers/Library')
const SessionController = require('./app/controllers/Session')
const UserController = require('./app/controllers/User')

/** Validators */
const UserValidator = require('./app/validators/User')
const SessionValidator = require('./app/validators/Session')
const LibraryValidator = require('./app/validators/Library')

/** Routes */

/** Users */
routes.post('/user', validate(UserValidator), handle(UserController.store))

/** Session */
routes.post('/session', validate(SessionValidator), handle(SessionController.store))

/** Library */
routes.get('/library/', handle(LibraryController.index))

/** Set Middleware */
routes.use(AuthMiddleware)

/** Auth routes */

/** Library */
routes.post('/library/', validate(LibraryValidator.create), handle(LibraryController.store))
routes.get('/library/:id', validate(LibraryValidator.byId), handle(LibraryController.show))
routes.delete('/library/:id', validate(LibraryValidator.byId), handle(LibraryController.destroy))

/**
 * Not Found
 */

routes.use('/*', (req, res) => {
  res.status(404).json({ error: 'Not found' })
})

module.exports = routes
