const express = require('express')

const routes = express.Router()

const UserController = require('./app/controllers/User')
const SessionController = require('./app/controllers/Session')

routes.post('/user', UserController.store)
routes.post('/session', SessionController.store)

module.exports = routes
